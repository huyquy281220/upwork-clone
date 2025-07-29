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
  Req,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageStatusDto } from './dto/update-message-status.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

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
    @Req() req: Request & { user: AuthenticatedUser },
  ) {
    return this.messagesService.createMessage(req.user.id, createMessageDto);
  }

  @Get()
  findAll(
    @Query('conversationId') conversationId: string,
    @Req() req: Request & { user: AuthenticatedUser },
    @Query('page', new ParseIntPipe({ optional: true })) page: number = 1,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number = 50,
    @Query('isRead') isRead?: string,
  ) {
    return this.messagesService.findAllMessages({
      limit,
      page,
      conversationId,
      userId: req.user.id,
      isRead: isRead ? isRead === 'true' : undefined,
    });
  }

  @Get('unread-count')
  getUnreadCount(
    @Req() req: Request & { user: AuthenticatedUser },
    @Query('conversationId') conversationId?: string,
  ) {
    return this.messagesService.getUnreadMessageCount(
      req.user.id,
      conversationId,
    );
  }

  @Get('stats/:conversationId')
  getStats(
    @Param('conversationId') conversationId: string,
    @Req() req: Request & { user: AuthenticatedUser },
  ) {
    return this.messagesService.getMessageStats(conversationId, req.user.id);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Req() req: Request & { user: AuthenticatedUser },
  ) {
    return this.messagesService.findOneMessage(id, req.user.id);
  }

  @Patch(':id/read')
  markAsRead(
    @Param('id') id: string,
    @Req() req: Request & { user: AuthenticatedUser },
  ) {
    return this.messagesService.markAsRead(id, req.user.id);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateMessageStatusDto,
    @Req() req: Request & { user: AuthenticatedUser },
  ) {
    return this.messagesService.updateMessageStatus(
      id,
      req.user.id,
      updateStatusDto,
    );
  }

  @Patch('conversation/:conversationId/mark-read')
  markAllAsRead(
    @Param('conversationId') conversationId: string,
    @Req() req: Request & { user: AuthenticatedUser },
  ) {
    return this.messagesService.markAllAsRead(conversationId, req.user.id);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Req() req: Request & { user: AuthenticatedUser },
  ) {
    return this.messagesService.deleteMessage(id, req.user.id);
  }
}
