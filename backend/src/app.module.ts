import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { MessageModule } from './message/message.module';
import { EmailService } from './message/email.service';

@Module({
  imports: [UserModule, PrismaModule, MessageModule],
  controllers: [AppController],
  providers: [AppService, UserService, PrismaService, EmailService],
})
export class AppModule {}
