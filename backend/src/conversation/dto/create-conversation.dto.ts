import { IsArray, IsString } from 'class-validator';

export class CreateConversationDto {
  @IsArray()
  @IsString({ each: true })
  participantIds: string[];
}
