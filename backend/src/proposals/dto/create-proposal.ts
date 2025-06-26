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
  pricing: number;

  @IsString()
  attachment: string;

  @IsString()
  timeline: string;
}
