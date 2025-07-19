import { IsString } from 'class-validator';

export class AddCardDto {
  @IsString()
  paymentMethodId: string;

  @IsString()
  email: string;
}
