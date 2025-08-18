import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentMethodType } from '@prisma/client';
import { PaymentStatus } from '@prisma/client';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

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
}
