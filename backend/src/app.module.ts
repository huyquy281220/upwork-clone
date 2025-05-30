import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { MessageModule } from './email/email.module';
import { EmailService } from './email/email.service';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { SavedJobsModule } from './saved-jobs/saved-jobs.module';
import { SavedJobsService } from './saved-jobs/saved-jobs.service';
@Module({
  imports: [
    UserModule,
    PrismaModule,
    MessageModule,
    AuthModule,
    JwtModule,
    SavedJobsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    UserService,
    PrismaService,
    EmailService,
    AuthService,
    JwtService,
    SavedJobsService,
  ],
})
export class AppModule {}
