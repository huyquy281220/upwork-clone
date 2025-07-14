import { Inject, Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { CreatePaymentMethodDto } from './dto/create-payment-method';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StripeService {
  constructor(
    @Inject('STRIPE_CLIENT') private stripe: Stripe,
    private prismaService: PrismaService,
  ) {}

  //   create freelancer account
  async createConnectedAccount(email: string) {
    try {
      const account = await this.stripe.accounts.create({
        type: 'express',
        email,
        capabilities: {
          transfers: { requested: true },
        },
      });

      return account;
    } catch (error) {
      throw new Error(error);
    }
  }

  // create account onboarding link
  async createAccountLink(
    accountId: string,
    refreshUrl: string,
    returnUrl: string,
  ) {
    try {
      const accountLink = await this.stripe.accountLinks.create({
        account: accountId,
        refresh_url: refreshUrl,
        return_url: returnUrl,
        type: 'account_onboarding',
      });

      return accountLink.url;
    } catch (error) {
      throw new Error(error);
    }
  }

  //   customer
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

  async createPaymentMethod(data: CreatePaymentMethodDto) {
    try {
      const billingAddress = data.billing_details.address;

      const user = await this.prismaService.user.findUnique({
        where: { email: data.email },
      });

      if (!user.stripeCustomerId) {
        const customer = await this.createCustomer(
          data.email,
          data.billing_details.name,
        );

        await this.prismaService.user.update({
          where: {
            email: user.email,
          },
          data: {
            stripeCustomerId: customer.id,
          },
        });
      }

      const paymentMethod = await this.stripe.paymentMethods.create({
        type: 'card',
        customer: data.customerId,
        billing_details: {
          name: data.billing_details.name,
          address: {
            city: billingAddress.city,
            line1: billingAddress.line1,
            line2: billingAddress.line2,
            country: billingAddress.country,
            postal_code: billingAddress.postal_code,
            state: billingAddress.state,
          },
        },
      });

      return paymentMethod;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  //   create payment intent
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

  //   create escrow payment intent
  async createEscrowPaymentIntent(
    customerId: string,
    amount: number,
    currency: string,
  ) {
    const paymentIntent = await this.stripe.paymentIntents.create({
      customer: customerId,
      amount,
      currency,
      payment_method_types: ['card'],
      capture_method: 'manual', // authorize only
    });

    return paymentIntent;
  }

  // Release escrow payment (capture)
  async capturePaymentIntent(paymentIntentId: string) {
    try {
      const paymentIntent =
        await this.stripe.paymentIntents.capture(paymentIntentId);
      return paymentIntent;
    } catch (error) {
      throw new Error(error);
    }
  }

  /* PaymentMethod */
  async attachPaymentMethod(paymentMethodId: string, customerId: string) {
    try {
      const paymentMethod = await this.stripe.paymentMethods.attach(
        paymentMethodId,
        {
          customer: customerId,
        },
      );

      // Optionally set as default
      await this.stripe.customers.update(customerId, {
        invoice_settings: {
          default_payment_method: paymentMethod.id,
        },
      });

      // Return the payment method details to store reference in DB
      return paymentMethod;
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

  //   create payment with fee
  async createPaymentWithFee(
    customerId: string,
    amount: number,
    currency: string,
    applicationFeeAmount: number,
    freelancerAccountId: string,
  ) {
    const paymentIntent = await this.stripe.paymentIntents.create({
      customer: customerId,
      amount,
      currency,
      payment_method_types: ['card'],
      application_fee_amount: applicationFeeAmount,
      transfer_data: {
        destination: freelancerAccountId,
      },
    });

    return paymentIntent;
  }

  // Transfer money to freelancer (payout)
  async transferToFreelancer(
    amount: number,
    currency: string,
    destinationAccountId: string,
  ) {
    try {
      const transfer = await this.stripe.transfers.create({
        amount,
        currency,
        destination: destinationAccountId,
      });

      return transfer;
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
