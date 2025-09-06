import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import {
  ContractStatus,
  MilestoneStatus,
  NotificationType,
  PaymentMethodType,
} from '@prisma/client';
import { PaymentStatus } from '@prisma/client';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import Stripe from 'stripe';
import { StripeService } from 'src/stripe/stripe.service';

@Injectable()
export class PaymentsService {
  constructor(
    private prisma: PrismaService,
    private stripeService: StripeService,
  ) {}

  async createPayment(data: CreatePaymentDto) {
    const {
      contractId,
      amount,
      applicationFeeAmount,
      paymentIntentId,
      captureMethod,
    } = data;

    try {
      const contract = await this.prisma.contract.findUnique({
        where: { id: contractId },
      });

      if (!contract) {
        throw new NotFoundException('Contract not found');
      }

      const payment = await this.prisma.payment.create({
        data: {
          contractId,
          amount,
          currency: 'USD',
          status: PaymentStatus.PENDING,
          method: PaymentMethodType.CARD,
          paymentIntentId,
          captureMethod,
          applicationFeeAmount,
        },
      });

      return payment;
    } catch (error) {
      throw new BadRequestException('Failed to create payment');
    }
  }

  async updatePayment(data: UpdatePaymentDto) {
    const {
      paymentId,
      status,
      paymentIntentId,
      captureMethod,
      applicationFeeAmount,
    } = data;

    try {
      const payment = await this.prisma.payment.update({
        where: { id: paymentId },
        data: { status, paymentIntentId, captureMethod, applicationFeeAmount },
      });

      return payment;
    } catch (error) {
      throw new BadRequestException('Failed to update payment');
    }
  }

  async deletePayment(paymentId: string) {
    try {
      const payment = await this.prisma.payment.delete({
        where: { id: paymentId },
      });

      return payment;
    } catch (error) {
      throw new BadRequestException('Failed to delete payment');
    }
  }

  async updatePaymentStatus(
    paymentId: string,
    status: PaymentStatus,
    paymentIntentId?: string,
  ) {
    return this.prisma.payment.update({
      where: { id: paymentId },
      data: {
        status,
        paymentIntentId: paymentIntentId || undefined,
      },
    });
  }

  async handlePaymentSuccess(paymentIntent: Stripe.PaymentIntent) {
    return this.prisma.$transaction(async (tx) => {
      // 1. Update payment status
      const payment = await tx.payment.update({
        where: { paymentIntentId: paymentIntent.id },
        data: { status: PaymentStatus.PAID, paidAt: new Date() },
        include: {
          contract: {
            include: {
              freelancer: { include: { user: true } },
              client: { include: { user: true } },
              milestones: true,
            },
          },
        },
      });

      const contract = payment.contract;
      const contractId = paymentIntent.metadata.contractId;
      const milestoneId = paymentIntent.metadata.milestoneId;

      // 2. Update milestone status if this payment is for a milestone
      if (milestoneId) {
        await tx.milestone.update({
          where: { id: milestoneId },
          data: {
            status: MilestoneStatus.COMPLETED,
            completedAt: new Date(),
          },
        });
      }

      // 3. Check if all milestones are completed before marking contract complete
      if (contract.contractType === 'FIXED_PRICE') {
        const allMilestones = await tx.milestone.findMany({
          where: { contractId },
        });

        const allCompleted = allMilestones.every(
          (milestone) => milestone.status === MilestoneStatus.COMPLETED,
        );

        if (allCompleted) {
          await tx.contract.update({
            where: { id: contractId },
            data: { status: ContractStatus.COMPLETED },
          });
        }
      }

      // 4. Create notifications
      await tx.notification.createMany({
        data: [
          {
            userId: contract.freelancer.userId,
            type: NotificationType.PAYMENT,
            content: `You've received a payment of $${(payment.amount / 100).toFixed(2)} for contract "${contract.title}".`,
            itemId: contract.id,
          },
          {
            userId: contract.client.userId,
            type: NotificationType.PAYMENT,
            content: `Payment of $${(payment.amount / 100).toFixed(2)} has been processed for contract "${contract.title}".`,
            itemId: contract.id,
          },
        ],
      });

      return { payment, milestoneUpdated: !!milestoneId };
    });
  }

  async handlePaymentFailure(paymentIntent: Stripe.PaymentIntent) {
    await this.prisma.payment.update({
      where: { paymentIntentId: paymentIntent.id },
      data: { status: PaymentStatus.FAILED },
    });
  }

  async handlePaymentCanceled(paymentIntent: Stripe.PaymentIntent) {
    const contractId = paymentIntent.metadata.contractId;
    const payment = await this.prisma.payment.findFirst({
      where: { contractId, status: PaymentStatus.SUCCEEDED },
    });

    if (payment) {
      await this.stripeService.createRefund(payment.paymentIntentId);
      await this.prisma.payment.update({
        where: { paymentIntentId: paymentIntent.id },
        data: { status: PaymentStatus.REFUNDED },
      });
    }
  }

  async handleChargeCaptured(charge: Stripe.Charge) {
    // Handle when escrow payment is captured
    const paymentIntentId = charge.payment_intent as string;
    await this.prisma.payment.update({
      where: { paymentIntentId },
      data: {
        status: PaymentStatus.PAID,
        paidAt: new Date(),
      },
    });
  }

  async chargeOnApproval(contractId: string, amount: number) {
    // Step 1: Create payment record in transaction
    const payment = await this.prisma.$transaction(async (tx) => {
      const contract = await tx.contract.findUnique({
        where: { id: contractId },
        include: { client: { include: { user: true } } },
      });

      if (!contract) throw new NotFoundException('Contract not found');
      if (!contract.client.user.stripeCustomerId) {
        throw new BadRequestException('Client has no Stripe customer');
      }

      return await tx.payment.create({
        data: {
          contractId: contract.id,
          amount,
          currency: 'USD',
          status: 'PENDING',
          method: 'CARD',
        },
      });
    });

    // Step 2: Process payment outside transaction
    try {
      const contract = await this.prisma.contract.findUnique({
        where: { id: contractId },
        include: { client: { include: { user: true } } },
      });

      const methods = await this.stripeService.getListPaymentMethods(
        contract.client.user.stripeCustomerId,
      );
      const defaultMethod = methods.find((m) => m.isDefault);

      if (!defaultMethod) {
        await this.updatePaymentStatus(
          payment.id,
          'FAILED',
          'No default payment method',
        );
        throw new BadRequestException('No default payment method');
      }

      const pi = await this.stripeService.createPaymentIntent({
        paymentMethodId: defaultMethod.id,
        amount,
        currency: payment.currency.toLowerCase(),
        capture_method: 'automatic',
        contractId: contract.id,
        freelancerId: contract.freelancerId,
        clientId: contract.clientId,
        contractType: contract.contractType,
      });

      // Update to PROCESSING (not SUCCEEDED yet)
      await this.updatePaymentStatus(
        payment.id,
        PaymentStatus.PROCESSING,
        pi.id,
      );

      return { paymentId: payment.id, paymentIntentId: pi.id };
    } catch (error) {
      await this.updatePaymentStatus(payment.id, 'FAILED', error.message);
      throw error;
    }
  }
}
