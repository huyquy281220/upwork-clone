import {
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { LanguageProficiency } from '@prisma/client';

export class LanguageItemDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsString()
  name: string;

  @IsEnum(LanguageProficiency)
  proficiency: LanguageProficiency;
}

export class UpdateLanguagesDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LanguageItemDto)
  languages: LanguageItemDto[];
}
