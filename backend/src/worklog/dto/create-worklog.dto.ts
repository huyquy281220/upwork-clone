import { IsString, IsDateString, IsOptional } from 'class-validator';

export class CreateWorkLogDto {
  @IsString()
  contractId: string;

  @IsDateString()
  loggedAt: string;

  @IsOptional()
  @IsDateString()
  endTime?: string;

  @IsOptional()
  @IsString()
  description?: string;

  freelancerId?: string;
}
