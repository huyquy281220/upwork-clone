import { Type } from 'class-transformer';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateProposalDto {
  @IsString()
  freelancerId: string;

  @IsString()
  jobId: string;

  @IsString()
  @IsOptional()
  coverLetter?: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  pricing?: number;

  @IsString()
  @IsOptional()
  timeline?: string;
}
