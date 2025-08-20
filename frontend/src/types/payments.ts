import { StripeElement } from "@stripe/stripe-js";

export enum PaymentMethodType {
  CARD = "CARD",
  BANK_TRANSFER = "BANK_TRANSFER",
}

export enum PaymentStatus {
  PENDING = "PENDING",
  AUTHORIZED = "AUTHORIZED",
  PAID = "PAID",
  FAILED = "FAILED",
  CANCELED = "CANCELED",
  REFUNDED = "REFUNDED",
  SUCCEEDED = "SUCCEEDED",
}

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
  id: string;
  isDefault: boolean;
  card: {
    brand: string;
    last4: string;
    exp_month: number;
    exp_year: number;
  };
}
