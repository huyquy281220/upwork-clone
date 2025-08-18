import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { StripeModule } from 'src/stripe/stripe.module';

@Module({
  controllers: [PaymentsController],
  imports: [PrismaModule, StripeModule],
  providers: [PaymentsService],
  exports: [PaymentsService],
})
export class PaymentsModule {}
