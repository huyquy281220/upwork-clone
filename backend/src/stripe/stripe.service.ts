import { Inject, Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  constructor(@Inject('STRIPE_CLIENT') private stripe: Stripe) {}

  async createCustomer(email: string, name: string) {
    try {
      return await this.stripe.customers.create({ email, name });
    } catch (error) {
      throw new Error(`Failed to create Stripe customer: ${error.message}`);
    }
  }

  async updateCustomer(customerId: string, data: Stripe.CustomerUpdateParams) {
    try {
      const newCustomer = await this.stripe.customers.update(customerId, data);

      return newCustomer;
    } catch (error) {
      throw new Error(`Failed to update Stripe customer: ${error.message}`);
    }
  }

  async deleteCustomer(customerId: string) {
    try {
      return await this.stripe.customers.del(customerId);
    } catch (error) {
      throw new Error(`Failed to delete Stripe customer: ${error.message}`);
    }
  }

  async createPaymentIntent(amount: number, currency: string) {
    try {
      return await this.stripe.paymentIntents.create({
        amount,
        currency,
      });
    } catch (error) {
      throw new Error(
        `Failed to create Stripe payment intent: ${error.message}`,
      );
    }
  }

  async createSetupIntent(customerId: string) {
    return await this.stripe.setupIntents.create({
      customer: customerId,
      payment_method_types: ['card'],
    });
  }

  /* PaymentMethod */

  async attachPaymentMethod(paymentMethodId: string, customerId: string) {
    try {
      return await this.stripe.paymentMethods.attach(paymentMethodId, {
        customer: customerId,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async detachPaymentMethod(paymentMethodId: string) {
    try {
      return await this.stripe.paymentMethods.detach(paymentMethodId);
    } catch (error) {
      throw new Error(error);
    }
  }

  /* Subscription */

  async createSubscription(customerId: string, priceId: string) {
    try {
      const subscription = await this.stripe.subscriptions.create({
        customer: customerId,
        items: [{ price: priceId }],
        payment_behavior: 'default_incomplete',
        expand: ['latest_invoice.payment_intent'],
      });

      return subscription;
    } catch (error) {
      throw new Error(error);
    }
  }

  async cancelSubscription(subscriptionId: string) {
    try {
      return await this.stripe.subscriptions.deleteDiscount(subscriptionId);
    } catch (error) {
      throw new Error(error);
    }
  }

  /* Checkout */

  async createCheckoutSession(data: {
    customerEmail: string;
    lineItems: Stripe.Checkout.SessionCreateParams.LineItem[];
    successUrl: string;
    cancelUrl: string;
  }) {
    try {
      const checkout = await this.stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        customer_email: data.customerEmail,
        line_items: data.lineItems,
        success_url: data.successUrl,
        cancel_url: data.cancelUrl,
      });

      return checkout;
    } catch (error) {
      throw new Error(error);
    }
  }

  /* Refund */

  async createRefund(paymentIntentId: string, amount?: number) {
    try {
      return await this.stripe.refunds.create({
        payment_intent: paymentIntentId,
        amount,
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
