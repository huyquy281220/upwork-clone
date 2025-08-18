import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePaymentDto {
  @IsString()
  contractId: string;

  @IsNumber()
  amount: number;

  @IsOptional()
  @IsString()
  applicationFeeAmount?: number;

  @IsOptional()
  @IsString()
  paymentIntentId?: string;

  @IsOptional()
  @IsString()
  captureMethod?: 'automatic' | 'manual';
}
