import { IsBoolean, IsOptional, IsDateString } from 'class-validator';

export class UpdateMessageStatusDto {
  @IsOptional()
  @IsBoolean()
  isRead?: boolean;

  @IsOptional()
  @IsDateString()
  readAt?: string;

  @IsOptional()
  @IsDateString()
  deliveredAt?: string;
}
