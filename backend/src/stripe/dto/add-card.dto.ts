import { IsString } from 'class-validator';

export class AddCardDto {
  @IsString()
  paymentMethodId: string;

  @IsString()
  customerId: string;
}
