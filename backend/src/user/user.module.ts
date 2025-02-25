import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MessageModule } from 'src/message/message.module';
import { EmailService } from 'src/message/email.service';

@Module({
  imports: [PrismaModule, MessageModule],
  controllers: [UserController],
  providers: [PrismaService, UserService, EmailService],
})
export class UserModule {}
