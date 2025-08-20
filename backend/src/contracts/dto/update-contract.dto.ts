import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ContractStatus } from '@prisma/client';

export class UpdateContractDto {
  @IsEnum(ContractStatus)
  @IsOptional()
  status?: ContractStatus;

  @IsString()
  clientId: string;
}
