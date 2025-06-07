import { IsString } from 'class-validator';

export class CreateContractDto {
  @IsString()
  jobId: string;

  @IsString()
  freelancerId: string;
}
