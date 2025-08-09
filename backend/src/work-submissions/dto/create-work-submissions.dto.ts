import { IsString, IsNotEmpty } from 'class-validator';

export class CreateWorkSubmissionDto {
  @IsString()
  contractId: string;

  @IsString()
  workLogId: string;

  @IsString()
  title: string;

  @IsString()
  description: string;
}
