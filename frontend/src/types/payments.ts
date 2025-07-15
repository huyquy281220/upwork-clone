export interface CreatePaymentMethodProps {
  email: string;
  billing_details: {
    city: string;
    line1: string;
    line2?: string;
    country: string;
    postal_code: string;
    state?: string;
  };
}
