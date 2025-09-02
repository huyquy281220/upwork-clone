import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateWorkSubmissionDto {
  @IsString()
  contractId: string;

  @IsString()
  @IsOptional()
  workLogId: string;

  @IsString()
  @IsOptional()
  milestoneId: string;

  @IsString()
  title: string;

  @IsString()
  description: string;
}
