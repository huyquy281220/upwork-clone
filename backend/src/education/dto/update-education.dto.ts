import {
  IsArray,
  IsOptional,
  IsString,
  IsNumber,
  ValidateNested,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';

export class EducationItemDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsString()
  school: string;

  @IsOptional()
  @IsNumber()
  @Min(1900)
  @Max(2100)
  startYear?: number;

  @IsOptional()
  @IsNumber()
  @Min(1900)
  @Max(2100)
  endYear?: number;

  @IsOptional()
  @IsString()
  degree?: string;

  @IsOptional()
  @IsString()
  areaOfStudy?: string;

  @IsOptional()
  @IsString()
  description?: string;
}

export class UpdateEducationDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EducationItemDto)
  education: EducationItemDto[];
}
