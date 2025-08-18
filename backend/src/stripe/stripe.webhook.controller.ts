import { Controller, Post, Req, Headers } from '@nestjs/common';
import { Request } from 'express';
import Stripe from 'stripe';
import { StripeService } from './stripe.service';
import { PaymentsService } from 'src/payments/payments.service';

@Controller('webhook')
export class WebhookController {
  constructor(
    private readonly stripeService: StripeService,
    private readonly paymentsService: PaymentsService,
  ) {}

  @Post()
  async handleWebhook(
    @Req() req: Request,
    @Headers('stripe-signature') sig: string,
  ) {
    const stripe = this.stripeService['stripe'];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        req['rawBody'],
        sig,
        endpointSecret,
      );
    } catch (err) {
      console.log('Webhook Error:', err.message);
      return;
    }

    // Handle events
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await this.paymentsService.handlePaymentSuccess(paymentIntent);
        break;

      case 'payment_intent.payment_failed':
        const failedPaymentIntent = event.data.object as Stripe.PaymentIntent;
        await this.paymentsService.handlePaymentFailure(failedPaymentIntent);
        break;

      case 'payment_intent.canceled':
        const canceledPaymentIntent = event.data.object as Stripe.PaymentIntent;
        await this.paymentsService.handlePaymentCanceled(canceledPaymentIntent);
        break;

      case 'charge.captured':
        const charge = event.data.object as Stripe.Charge;
        await this.paymentsService.handleChargeCaptured(charge);
        break;
    }

    return { received: true };
  }
}
