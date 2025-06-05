import {
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { LanguageLevel } from '@prisma/client';

export class LanguageItemDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsString()
  name: string;

  @IsEnum(LanguageLevel)
  level: LanguageLevel;
}

export class UpdateLanguagesDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LanguageItemDto)
  languages: LanguageItemDto[];
}
