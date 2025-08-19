import { IsBoolean, IsOptional, IsString } from 'class-validator';

import { IsNumber } from 'class-validator';

export class CreatePaymentIntentDto {
  @IsNumber()
  amount: number;

  @IsString()
  currency: string;

  @IsString()
  capture_method: string;

  @IsString()
  contractId: string;

  @IsString()
  freelancerId: string;

  @IsString()
  clientId: string;

  @IsString()
  paymentMethodId: string;

  @IsOptional()
  @IsBoolean()
  firstTime?: boolean;

  @IsString()
  contractType: string;
}
