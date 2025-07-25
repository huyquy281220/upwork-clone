import { Module } from '@nestjs/common';
import { ContractsController } from './contracts.controller';
import { ContractsService } from './contracts.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { AuthModule } from 'src/auth/auth.module';
import { StripeModule } from 'src/stripe/stripe.module';

@Module({
  imports: [NotificationsModule, AuthModule, StripeModule],
  controllers: [ContractsController],
  providers: [ContractsService, PrismaService],
  exports: [ContractsService],
})
export class ContractsModule {}
