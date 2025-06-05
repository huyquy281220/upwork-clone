import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';

Module({
  imports: [PrismaModule],
  controllers: [],
  exports: [],
  providers: [],
});
