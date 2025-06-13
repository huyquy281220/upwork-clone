import { IsString } from 'class-validator';

export class SkillItemDto {
  @IsString()
  skillId: string;

  @IsString()
  name: string;
}
