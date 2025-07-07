import { Controller, Post, Body } from '@nestjs/common';
import { StripeService } from './stripe.service';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('customer')
  createCustomer(@Body() body: { email: string; name: string }) {
    return this.stripeService.createCustomer(body.email, body.name);
  }

  @Post('payment-intent')
  createPaymentIntent(@Body() body: { amount: number; currency: string }) {
    return this.stripeService.createPaymentIntent(body.amount, body.currency);
  }

  @Post('subscription')
  createSubscription(@Body() body: { customerId: string; priceId: string }) {
    return this.stripeService.createSubscription(body.customerId, body.priceId);
  }

  @Post('checkout-session')
  createCheckoutSession(@Body() body: any) {
    return this.stripeService.createCheckoutSession(body);
  }
}
