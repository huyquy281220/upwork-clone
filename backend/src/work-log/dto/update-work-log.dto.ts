import { IsString, IsISO8601, IsOptional } from 'class-validator';

export class UpdateWorkLogDto {
  @IsString()
  @IsOptional()
  description?: string;

  @IsISO8601()
  @IsOptional()
  loggedAt?: string;

  @IsISO8601()
  @IsOptional()
  endTime?: string;
}
