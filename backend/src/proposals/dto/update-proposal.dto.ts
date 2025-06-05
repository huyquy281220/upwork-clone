import { ProposalStatus } from '@prisma/client';
import { IsString, IsNumber, IsOptional, IsEnum } from 'class-validator';

export class UpdateProposalDto {
  @IsString()
  jobId: string;

  @IsString()
  @IsOptional()
  coverLetter?: string;

  @IsNumber()
  hourlyRate: number;

  @IsEnum(ProposalStatus)
  @IsOptional()
  status?: ProposalStatus;
}
