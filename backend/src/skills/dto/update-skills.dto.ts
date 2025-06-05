import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';

export class SkillItemDto {
  @IsString()
  skillId: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(5)
  proficiency?: number;
}

export class UpdateSkillsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SkillItemDto)
  skills: SkillItemDto[];
}
