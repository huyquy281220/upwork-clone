import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { MessageModule } from 'src/email/email.module';
import { EmailService } from 'src/email/email.service';
import { LocalStrategy } from './strategy/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategy/jwt.strategy';
import { JwtRefreshStrategy } from './strategy/jwt-refresh.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { NextAuthGuard } from './guards/nextauth.guard';

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
    JwtRefreshStrategy,
    RolesGuard,
    JwtAuthGuard,
    NextAuthGuard,
  ],
  exports: [JwtAuthGuard, JwtStrategy, RolesGuard, NextAuthGuard, JwtService],
})
export class AuthModule {}
