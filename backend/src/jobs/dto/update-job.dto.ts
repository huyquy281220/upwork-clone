import { JobType } from '@prisma/client';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsBoolean,
  IsArray,
  IsNotEmpty,
  ValidateNested,
  IsDate,
} from 'class-validator';
import {
  ExperienceLevel,
  HoursPerWeek,
  ProjectLength,
  JobDuration,
} from './enums.dto';
import { JobSkillDto } from './create-job.dto';
import { Type } from 'class-transformer';

export class UpdateJobDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  experienceLevel?: ExperienceLevel;

  @IsOptional()
  @IsEnum(JobType)
  jobType?: JobType;

  @IsOptional()
  @IsNumber()
  hourlyRateMin?: number;

  @IsOptional()
  @IsNumber()
  hourlyRateMax?: number;

  @IsOptional()
  @IsNumber()
  fixedPrice?: number;

  @IsOptional()
  @IsString()
  projectLength?: ProjectLength;

  @IsOptional()
  @IsString()
  hoursPerWeek?: HoursPerWeek;

  @IsOptional()
  @IsString()
  jobDuration?: JobDuration;

  @IsOptional()
  @IsBoolean()
  contractToHire?: boolean;

  @IsOptional()
  @IsArray()
  @IsNotEmpty()
  @IsString({ each: true })
  skills?: string[];
}
