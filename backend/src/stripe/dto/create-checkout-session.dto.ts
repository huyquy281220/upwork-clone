export class CreateCheckoutSessionDto {
  customerEmail: string;
  contractName: string;
  totalAmount: number;
  successUrl: string;
  cancelUrl: string;
}
