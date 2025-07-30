import { PrismaModule } from '../prisma/prisma.module';
import { WorkLogController } from './work-log.controller';
import { WorkLogService } from './work-log.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [PrismaModule],
  controllers: [WorkLogController],
  providers: [WorkLogService],
})
export class WorkLogModule {}
