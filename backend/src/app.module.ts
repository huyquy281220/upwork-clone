import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { MessageModule } from './email/email.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { SavedJobsModule } from './saved-jobs/saved-jobs.module';
import { LanguagesModule } from './languages/languages.module';
import { SkillsModule } from './skills/skills.module';
import { EducationModule } from './education/education.module';
import { JobsModule } from './jobs/jobs.module';
import { ContractsModule } from './contracts/contracts.module';
import { ConversationsModule } from './conversation/conversation.module';
import { NotificationsModule } from './notifications/notifications.module';
import { ProposalsModule } from './proposals/proposals.module';
import { UserSkillsModule } from './user-skills/user-skills.module';
@Module({
  imports: [
    UserModule,
    PrismaModule,
    MessageModule,
    JobsModule,
    AuthModule,
    JwtModule,
    SavedJobsModule,
    LanguagesModule,
    SkillsModule,
    EducationModule,
    ContractsModule,
    ConversationsModule,
    ProposalsModule,
    NotificationsModule,
    UserSkillsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
