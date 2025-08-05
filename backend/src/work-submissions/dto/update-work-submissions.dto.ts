import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateWorkSubmissionDto {
  @IsString()
  @IsNotEmpty()
  contractId: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  description: string;
}
