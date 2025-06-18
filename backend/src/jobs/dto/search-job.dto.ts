import { IsOptional, IsString, IsInt, IsEnum, Min, Max } from 'class-validator';

enum ExperienceLevel {
  ENTRY = 'Entry Level',
  INTERMEDIATE = 'Intermediate',
  EXPERT = 'Expert',
}

enum JobType {
  HOURLY = 'Hourly',
  FIXED_PRICE = 'Fixed-Price',
}

enum ProjectLength {
  LESS_THAN_ONE_MONTH = 'Less than one month',
  ONE_TO_THREE_MONTHS = '1 to 3 months',
  THREE_TO_SIX_MONTHS = '3 to 6 months',
  MORE_THAN_SIX_MONTHS = 'More than 6 months',
}

enum HoursPerWeek {
  LESS_THAN_30 = 'Less than 30 hrs/week',
  MORE_THAN_30 = 'More than 30 hrs/week',
}

enum JobDuration {
  CONTRACT_TO_HIRE = 'Contract-to-hire roles',
}

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
