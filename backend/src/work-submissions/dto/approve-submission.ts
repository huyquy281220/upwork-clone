import { IsOptional, IsString, IsNumber, Min, Max } from 'class-validator';

export class ApproveSubmissionDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(5)
  rating?: number;

  @IsOptional()
  @IsString()
  feedback?: string;
}
