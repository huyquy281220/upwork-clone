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
  email: string;
}

export interface PaymentMethodProps {
  object: string;
  data: {
    id: string;
    card: {
      brand: string;
      last4: string;
      exp_month: number;
      exp_year: number;
    };
  }[];
  has_more: boolean;
  url: string;
}
