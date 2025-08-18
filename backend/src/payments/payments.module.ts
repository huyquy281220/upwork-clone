import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';

@Module({
  controllers: [PaymentsController],
  imports: [PrismaModule],
  providers: [PaymentsService],
  exports: [PaymentsService],
})
export class PaymentsModule {}
