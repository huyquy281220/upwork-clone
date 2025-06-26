import { ProposalStatus } from '@prisma/client';
import { IsString, IsNumber, IsOptional, IsEnum } from 'class-validator';

export class UpdateProposalDto {
  @IsString()
  freelancerId: string;

  @IsString()
  @IsOptional()
  coverLetter?: string;

  @IsNumber()
  pricing?: number;

  @IsString()
  timeline?: string;

  @IsString()
  attachment?: string;

  @IsEnum(ProposalStatus)
  @IsOptional()
  status?: ProposalStatus;
}
