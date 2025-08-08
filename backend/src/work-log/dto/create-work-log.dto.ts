import { IsString, IsOptional, IsNumber, IsISO8601 } from 'class-validator';

export class CreateWorkLogDto {
  @IsString()
  contractId: string;

  @IsNumber()
  hours: number;

  @IsISO8601()
  loggedAt: string;

  @IsISO8601()
  endTime: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsString()
  freelancerId: string;
}
