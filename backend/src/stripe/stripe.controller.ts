import { Controller, Post, Body, Param, Get, Query } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { AddCardDto } from './dto/add-card.dto';
import { CreatePaymentMethodDto } from './dto/create-payment-method';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Get('/retrieve-payment-method/:paymentMethodId')
  async getPaymentMethod(
    @Param('paymentMethodId') paymentMethodId: string,
    // @Query('userId') userId: string,
  ) {
    return this.stripeService.getPaymentMethod(paymentMethodId);
  }

  @Get('/retrieve-payment-methods/:customerId')
  async getListPaymentMethods(@Param('customerId') customerId: string) {
    return this.stripeService.getListPaymentMethods(customerId);
  }

  @Get('/retrieve-detailed-account-info/:accountId')
  async getDetailedAccountInfo(@Param('accountId') accountId: string) {
    return this.stripeService.getDetailedAccountInfo(accountId);
  }

  @Get('/retrieve-account-info/:accountId')
  async getAccountInfo(@Param('accountId') accountId: string) {
    return this.stripeService.getAccountInfo(accountId);
  }

  @Post('set-default-payment-method')
  async setDefaultPaymentMethod(
    @Body()
    {
      customerId,
      paymentMethodId,
    }: {
      customerId: string;
      paymentMethodId: string;
    },
  ) {
    return this.stripeService.setDefaultPaymentMethod(
      customerId,
      paymentMethodId,
    );
  }

  @Post('add-card')
  async addCard(@Body() data: AddCardDto) {
    return this.stripeService.attachPaymentMethod(
      data.paymentMethodId,
      data.email,
    );
  }

  @Post('freelancer/:freelancerId/account')
  async createConnectedAccount(
    // @Param('freelancerId') freelancerId: string,
    @Body() body: { email: string },
  ) {
    const account = await this.stripeService.createConnectedAccount(body.email);
    return account;
  }

  @Post('freelancer/onboarding-link')
  async createOnboardingLink(
    // @Param('freelancerId') freelancerId: string,
    @Body() body: { accountId: string; email: string },
  ) {
    return this.stripeService.createAccountLink(body.accountId, body.email);
  }

  @Post('payment/escrow')
  async createEscrowPayment(
    @Body() body: { customerId: string; amount: number; currency: string },
  ) {
    const paymentIntent = await this.stripeService.createEscrowPaymentIntent(
      body.customerId,
      body.amount,
      body.currency,
    );
    return paymentIntent;
  }

  //   Release escrow payment (capture)
  @Post('payment/escrow/:paymentIntentId/capture')
  async capturePayment(@Param('paymentIntentId') paymentIntentId: string) {
    const paymentIntent =
      await this.stripeService.capturePaymentIntent(paymentIntentId);
    return paymentIntent;
  }

  //   Transfer payout to freelancer
  @Post('transfer')
  async transferToFreelancer(
    @Body()
    body: {
      amount: number;
      currency: string;
      destinationAccountId: string;
    },
  ) {
    const transfer = await this.stripeService.transferToFreelancer(
      body.amount,
      body.currency,
      body.destinationAccountId,
    );
    return transfer;
  }

  //   Payment with commission fee (application fee)
  @Post('payment/with-fee')
  async createPaymentWithFee(
    @Body()
    body: {
      customerId: string;
      amount: number;
      currency: string;
      applicationFeeAmount: number;
      freelancerAccountId: string;
    },
  ) {
    const paymentIntent = await this.stripeService.createPaymentWithFee(
      body.customerId,
      body.amount,
      body.currency,
      body.applicationFeeAmount,
      body.freelancerAccountId,
    );
    return paymentIntent;
  }
}
