import { Module, forwardRef } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { StripeModule } from 'src/stripe/stripe.module';
import { SocketModule } from 'src/socket/socket.module';

@Module({
  controllers: [PaymentsController],
  imports: [PrismaModule, forwardRef(() => StripeModule), SocketModule],
  providers: [PaymentsService],
  exports: [PaymentsService],
})
export class PaymentsModule {}
