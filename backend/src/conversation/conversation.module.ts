import { Module } from '@nestjs/common';
import { ConversationsService } from './conversation.service';
import { ConversationsController } from './conversation.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [NotificationsModule, AuthModule],
  controllers: [ConversationsController],
  providers: [ConversationsService, PrismaService],
  exports: [ConversationsService],
})
export class ConversationsModule {}
