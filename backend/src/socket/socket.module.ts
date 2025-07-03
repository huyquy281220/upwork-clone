import { Module } from '@nestjs/common';
import { NotificationsGateway } from './socket.gateway';
import { SocketService } from './socket.service';

@Module({
  providers: [NotificationsGateway, SocketService],
  exports: [NotificationsGateway],
})
export class SocketModule {}
