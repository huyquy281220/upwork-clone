import { IsOptional, IsString } from 'class-validator';
// import { Type } from 'class-transformer';

export class SkillItemDto {
  @IsString()
  skillId: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  categoryId?: string;

  @IsOptional()
  @IsString()
  categoryName?: string;
}
