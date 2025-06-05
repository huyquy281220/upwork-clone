import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateProposalDto {
  @IsString()
  jobId: string;

  @IsString()
  @IsOptional()
  coverLetter?: string;

  @IsNumber()
  hourlyRate: number;
}
