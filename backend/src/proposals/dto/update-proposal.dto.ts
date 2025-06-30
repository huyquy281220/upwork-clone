import { ProposalStatus } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsString, IsNumber, IsOptional, IsEnum } from 'class-validator';

export class UpdateProposalDto {
  @IsString()
  freelancerId: string;

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

  @IsEnum(ProposalStatus)
  @IsOptional()
  status?: ProposalStatus;
}
