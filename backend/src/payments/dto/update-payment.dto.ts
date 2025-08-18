import { IsOptional, IsString } from 'class-validator';
import { PaymentStatus } from '@prisma/client';

export class UpdatePaymentDto {
  @IsString()
  paymentId: string;

  @IsOptional()
  @IsString()
  status: PaymentStatus;

  @IsOptional()
  @IsString()
  paymentIntentId: string;

  @IsOptional()
  @IsString()
  captureMethod: string;

  @IsOptional()
  @IsString()
  applicationFeeAmount: number;
}
