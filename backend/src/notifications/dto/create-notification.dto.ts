import { IsString, IsBoolean, IsEnum } from 'class-validator';

enum NotificationType {
  APPLY_JOB = 'APPLY_JOB',
  CREATE_CONTRACT = 'CREATE_CONTRACT',
  REJECT_PROPOSAL = 'REJECT_PROPOSAL',
  MESSAGE = 'MESSAGE',
}

export class CreateNotificationDto {
  @IsString()
  userId: string;

  @IsString()
  content: string;

  @IsBoolean()
  isRead: boolean;

  @IsEnum(NotificationType)
  type: NotificationType;
}
