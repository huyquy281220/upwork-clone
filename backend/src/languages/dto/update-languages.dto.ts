import { Type } from 'class-transformer';
import { LanguageItemDto } from './create-languages.dto';
import { IsArray, ValidateNested } from 'class-validator';

export class UpdateLanguagesDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LanguageItemDto)
  languages: LanguageItemDto[];
}
