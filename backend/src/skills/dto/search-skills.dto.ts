import { IsString } from 'class-validator';

export class SearchSkillsDto {
  @IsString()
  searchValue: string;
}
