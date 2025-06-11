import { IsEnum, IsOptional, IsString } from 'class-validator';
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
