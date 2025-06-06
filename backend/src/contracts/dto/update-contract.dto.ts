import { IsEnum, IsOptional } from 'class-validator';
import { ContractStatus } from '@prisma/client';

export class UpdateContractDto {
  @IsEnum(ContractStatus)
  @IsOptional()
  status?: ContractStatus;
}
