import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateWorkSubmissionDto {
  @IsString()
  @IsNotEmpty()
  workLogId: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  fileUrl: string;
}
