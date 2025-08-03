import { IsString, IsNotEmpty } from 'class-validator';

export class CreateWorkSubmissionDto {
  @IsString()
  @IsNotEmpty()
  contractId: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;

  @IsString()
  fileUrl: string;
}
