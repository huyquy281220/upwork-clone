export class CreatePaymentIntentDto {
  amount: number;
  currency: string;
  capture_method: string;
  contractId: string;
  freelancerId: string;
  clientId: string;
}
