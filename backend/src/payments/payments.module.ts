import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PaymentsService } from './payments.service';

@Module({
  imports: [PrismaModule],
  providers: [PaymentsService],
  exports: [PaymentsService],
})
export class PaymentsModule {}
