import { IsArray, ArrayMinSize, ArrayMaxSize, IsUUID } from 'class-validator';

export class CreateConversationDto {
  @IsUUID('4', { message: 'Job ID must be a valid UUID' })
  jobId: string;

  @IsArray()
  @ArrayMinSize(2, { message: 'Conversation must have exactly 2 participants' })
  @ArrayMaxSize(2, { message: 'Conversation must have exactly 2 participants' })
  @IsUUID('4', {
    each: true,
    message: 'Each participant ID must be a valid UUID',
  })
  participantIds: string[];
}
