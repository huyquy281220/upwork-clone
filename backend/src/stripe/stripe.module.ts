import { Module, Global } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import Stripe from 'stripe';

@Global()
@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: 'STRIPE_CLIENT',
      useFactory: () => {
        return new Stripe(process.env.STRIPE_SECRET_KEY, {
          apiVersion: '2025-06-30.basil',
        });
      },
    },
  ],
  exports: ['STRIPE_CLIENT'],
})
export class StripeModule {}
