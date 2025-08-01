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
  Patch,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.createNotification(createNotificationDto);
  }

  @Get()
  findAll(
    @Query('limit') limit: string,
    @Query('page') page: string,
    @Query('userId') userId: string,
    @Query('isRead') isRead?: string,
  ) {
    return this.notificationsService.findAllNotifications({
      limit: limit ? parseInt(limit) : undefined,
      page: page ? parseInt(page) : undefined,
      userId,
      isRead: isRead ? isRead === 'true' : undefined,
    });
  }

  @Patch('/:id/read')
  markAsRead(@Param('id') id: string, @Query('userId') userId: string) {
    return this.notificationsService.markAsRead(id, userId);
  }

  @Put('read-all')
  markAllAsRead(@Query('userId') userId: string) {
    return this.notificationsService.markAllAsRead(userId);
  }

  @Delete(':id')
  delete(@Param('id') id: string, @Query('userId') userId: string) {
    return this.notificationsService.deleteNotification(id, userId);
  }

  @Delete()
  deleteAll(@Query('userId') userId: string) {
    return this.notificationsService.deleteAllNotifications(userId);
  }

  @Get()
  findOne(@Query('userId') userId: string) {
    return this.notificationsService.findNotificationsOfUser(userId);
  }
}
