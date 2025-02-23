import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { ClientController } from './client/client.controller';
import { FreelancerController } from './freelancer/freelancer.controller';
import { ClientModule } from './client/client.module';
import { FreelancerModule } from './freelancer/freelancer.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [UserModule, ClientModule, FreelancerModule, PrismaModule],
  controllers: [AppController, ClientController, FreelancerController],
  providers: [AppService, UserService, PrismaService],
})
export class AppModule {}
