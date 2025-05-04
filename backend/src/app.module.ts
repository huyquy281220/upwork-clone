import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { MessageModule } from './message/message.module';
import { EmailService } from './message/email.service';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [UserModule, PrismaModule, MessageModule, AuthModule, JwtModule],
  controllers: [AppController],
  providers: [
    AppService,
    UserService,
    PrismaService,
    EmailService,
    AuthService,
    JwtService,
  ],
})
export class AppModule {}
