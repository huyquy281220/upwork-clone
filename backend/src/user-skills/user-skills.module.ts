import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserSkillsService } from './user-skills.service';
import { UserSkillsController } from './user-skills.controller';

@Module({
  imports: [PrismaModule],
  providers: [UserSkillsService],
  exports: [UserSkillsService],
  controllers: [UserSkillsController],
})
export class UserSkillsModule {}
