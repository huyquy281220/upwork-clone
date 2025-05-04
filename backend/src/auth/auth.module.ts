import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { MessageModule } from 'src/message/message.module';
import { EmailService } from 'src/message/email.service';
import { LocalStrategy } from './strategy/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [UserModule, JwtModule, PrismaModule, MessageModule, PassportModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    JwtService,
    PrismaService,
    EmailService,
    LocalStrategy,
    JwtStrategy,
  ],
})
export class AuthModule {}
