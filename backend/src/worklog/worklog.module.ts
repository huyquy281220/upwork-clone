import { PrismaModule } from '../prisma/prisma.module';
import { WorkLogController } from './worklog.controller';
import { WorkLogService } from './worklog.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [PrismaModule],
  controllers: [WorkLogController],
  providers: [WorkLogService],
})
export class WorkLogModule {}
