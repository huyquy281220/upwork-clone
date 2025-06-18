import { IsOptional, IsString, IsInt, IsEnum, Min, Max } from 'class-validator';
import {
  ExperienceLevel,
  HoursPerWeek,
  JobDuration,
  JobType,
  ProjectLength,
} from './enums.dto';

export class SearchJobsDto {
  @IsOptional()
  @IsString()
  query?: string;

  @IsOptional()
  @IsEnum(ExperienceLevel)
  experienceLevel?: ExperienceLevel;

  @IsOptional()
  @IsEnum(JobType)
  jobType?: JobType;

  @IsOptional()
  @IsInt()
  @Min(100)
  @Max(5000)
  fixedPriceMin?: number;

  @IsOptional()
  @IsInt()
  @Min(500)
  @Max(10000)
  fixedPriceMax?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(50)
  numProposalsMin?: number;

  @IsOptional()
  @IsInt()
  @Min(5)
  @Max(50)
  numProposalsMax?: number;

  @IsOptional()
  @IsEnum(ProjectLength)
  projectLength?: ProjectLength;

  @IsOptional()
  @IsEnum(HoursPerWeek)
  hoursPerWeek?: HoursPerWeek;

  @IsOptional()
  @IsEnum(JobDuration)
  jobDuration?: JobDuration;
}
