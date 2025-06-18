import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { JobDuration } from './enums.dto';
import { HoursPerWeek } from './enums.dto';
import { ExperienceLevel, ProjectLength } from './enums.dto';
import { JobType } from '@prisma/client';

export class JobSkillDto {
  @IsNotEmpty()
  @IsUUID()
  skillId: string;
}

export class CreateJobDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  category: string;

  @IsString()
  experienceLevel: ExperienceLevel;

  @IsEnum(JobType)
  jobType: JobType;

  @IsOptional()
  @IsNumber()
  hourlyRateMin?: number;

  @IsOptional()
  @IsNumber()
  hourlyRateMax?: number;

  @IsOptional()
  @IsNumber()
  fixedPrice?: number;

  @IsString()
  projectLength: ProjectLength;

  @IsString()
  hoursPerWeek: HoursPerWeek;

  @IsString()
  jobDuration: JobDuration;

  @IsBoolean()
  contractToHire: boolean;

  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => JobSkillDto)
  skills: JobSkillDto[];
}
