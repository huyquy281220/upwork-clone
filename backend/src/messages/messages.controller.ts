import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageStatusDto } from './dto/update-message-status.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

interface AuthenticatedUser {
  id: string;
  email: string;
  role: string;
}

@Controller('messages')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  create(
    @Body() createMessageDto: CreateMessageDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.messagesService.createMessage(user.id, createMessageDto);
  }

  @Get()
  findAll(
    @Query('conversationId') conversationId: string,
    @CurrentUser() user: AuthenticatedUser,
    @Query('page', new ParseIntPipe({ optional: true })) page: number = 1,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number = 50,
    @Query('isRead') isRead?: string,
  ) {
    const skip = (page - 1) * limit;
    return this.messagesService.findAllMessages({
      skip,
      take: limit,
      conversationId,
      userId: user.id,
      isRead: isRead ? isRead === 'true' : undefined,
    });
  }

  @Get('unread-count')
  getUnreadCount(
    @CurrentUser() user: AuthenticatedUser,
    @Query('conversationId') conversationId?: string,
  ) {
    return this.messagesService.getUnreadMessageCount(user.id, conversationId);
  }

  @Get('stats/:conversationId')
  getStats(
    @Param('conversationId') conversationId: string,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.messagesService.getMessageStats(conversationId, user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.messagesService.findOneMessage(id, user.id);
  }

  @Patch(':id/read')
  markAsRead(@Param('id') id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.messagesService.markAsRead(id, user.id);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateMessageStatusDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.messagesService.updateMessageStatus(
      id,
      user.id,
      updateStatusDto,
    );
  }

  @Patch('conversation/:conversationId/mark-read')
  markAllAsRead(
    @Param('conversationId') conversationId: string,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.messagesService.markAllAsRead(conversationId, user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.messagesService.deleteMessage(id, user.id);
  }
}
