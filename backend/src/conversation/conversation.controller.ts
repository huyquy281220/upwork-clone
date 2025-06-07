import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ConversationsService } from './conversation.service';
import { CreateConversationDto } from './dto/create-conversation.dto';

@Controller('conversations')
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createConversationDto: CreateConversationDto) {
    return this.conversationsService.createConversation(createConversationDto);
  }

  @Get()
  findAll(
    @Query('skip') skip: string,
    @Query('take') take: string,
    @Query('userId') userId: string,
  ) {
    return this.conversationsService.findAllConversations({
      skip: skip ? parseInt(skip) : undefined,
      take: take ? parseInt(take) : undefined,
      userId,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Query('userId') userId: string) {
    return this.conversationsService.findOneConversation(id, userId);
  }

  @Delete(':id')
  delete(@Param('id') id: string, @Query('userId') userId: string) {
    return this.conversationsService.deleteConversation(id, userId);
  }
}
