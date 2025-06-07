import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProposalsController } from './proposals.controller';
import { ProposalsService } from './proposals.service';

Module({
  imports: [PrismaModule],
  controllers: [ProposalsController],
  providers: [ProposalsService],
});

export class ProposalsModule {}
