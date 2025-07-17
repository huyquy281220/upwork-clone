export class CreatePaymentMethodAddressDto {
  city: string;
  line1: string;
  line2?: string;
  country: string;
  postal_code: string;
  state?: string;
}

export class CreatePaymentMethodBillingDetailsDto {
  name: string;
  address: CreatePaymentMethodAddressDto;
}

export class CreatePaymentMethodDto {
  billing_details: CreatePaymentMethodBillingDetailsDto;
  // customerId: string;
  email: string;
}
