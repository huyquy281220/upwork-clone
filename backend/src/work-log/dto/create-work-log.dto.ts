import { IsString, IsDateString, IsOptional, IsNumber } from 'class-validator';

export class CreateWorkLogDto {
  @IsString()
  contractId: string;

  @IsNumber()
  hours: number;

  @IsDateString()
  loggedAt: string;

  @IsOptional()
  @IsDateString()
  endTime?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  freelancerId: string;
}
