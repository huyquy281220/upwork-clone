import { StripeElement } from "@stripe/stripe-js";

export interface CreatePaymentMethodProps {
  email: string;
  card: StripeElement;
  billing_details: {
    cardHolderName: string;
    address: {
      city: string;
      line1: string;
      line2?: string;
      country: string;
      postal_code: string;
      state?: string;
    };
  };
}

export interface AddCardProps {
  paymentMethodId: string;
  customerId: string;
}
