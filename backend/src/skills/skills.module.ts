import { Module } from '@nestjs/common';
import { SkillsController, SkillsListController } from './skills.controller';
import { SkillsService } from './skills.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SkillsController, SkillsListController],
  providers: [SkillsService],
  exports: [SkillsService],
})
export class SkillsModule {}
