import { Module } from '@nestjs/common';
import { WorkSubmissionsService } from './work-submissions.service';
import { WorkSubmissionsController } from './work-submissions.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [WorkSubmissionsController],
  providers: [WorkSubmissionsService],
})
export class WorkSubmissionsModule {}
