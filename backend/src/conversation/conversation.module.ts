import { Module } from '@nestjs/common';
import { ConversationsService } from './conversation.service';
import { ConversationsController } from './conversation.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ConversationsController],
  providers: [ConversationsService, PrismaService],
})
export class ConversationsModule {}
