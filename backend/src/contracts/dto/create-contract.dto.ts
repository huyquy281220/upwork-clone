import { Type } from 'class-transformer';
import {
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateContractDto {
  @IsString()
  jobId: string;

  @IsString()
  freelancerId: string;

  @IsString()
  clientId: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  projectDuration: string;

  @IsOptional()
  @IsNumber()
  hourlyRate: number;

  @IsOptional()
  @IsNumber()
  fixedPrice: number;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateMilestoneDto)
  milestone: CreateMilestoneDto[];

  @IsOptional()
  @IsDateString()
  startedAt: string;

  @IsOptional()
  @IsDateString()
  completedAt: string;

  @IsOptional()
  @IsDateString()
  canceledAt: string;
}

class CreateMilestoneDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  amount: number;

  @IsDateString()
  dueDate: string;
}
