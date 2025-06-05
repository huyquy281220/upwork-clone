import { JobType } from '@prisma/client';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class JobSkillDto {
  @IsNotEmpty()
  @IsUUID()
  skillId: string;
}

export class CreateJobDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  title: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(5000)
  description: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  category: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  budget: number;

  @IsNotEmpty()
  @IsEnum(JobType)
  type: JobType;

  @IsArray()
  skillIds: string[];
}
