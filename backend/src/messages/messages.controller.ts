import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(
    @Body() createMessageDto: CreateMessageDto,
    @Query('senderId') senderId: string,
  ) {
    return this.messagesService.createMessage(senderId, createMessageDto);
  }

  @Get()
  findAll(
    @Query('skip') skip: string,
    @Query('take') take: string,
    @Query('conversationId') conversationId: string,
    @Query('userId') userId: string,
    @Query('isRead') isRead?: string,
  ) {
    return this.messagesService.findAllMessages({
      skip: skip ? parseInt(skip) : undefined,
      take: take ? parseInt(take) : undefined,
      conversationId,
      userId,
      isRead: isRead ? isRead === 'true' : undefined,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Query('userId') userId: string) {
    return this.messagesService.findOneMessage(id, userId);
  }

  @Put(':id/read')
  markAsRead(@Param('id') id: string, @Query('userId') userId: string) {
    return this.messagesService.markAsRead(id, userId);
  }

  @Put('read-all')
  markAllAsRead(
    @Query('conversationId') conversationId: string,
    @Query('userId') userId: string,
  ) {
    return this.messagesService.markAllAsRead(conversationId, userId);
  }

  @Delete(':id')
  delete(@Param('id') id: string, @Query('userId') userId: string) {
    return this.messagesService.deleteMessage(id, userId);
  }
}
