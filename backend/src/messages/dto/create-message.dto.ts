import { IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  conversationId: string;

  @IsString()
  content: string;
}
