import { IsString, IsBoolean } from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  userId: string;

  @IsString()
  content: string;

  @IsBoolean()
  isRead: boolean;
}
