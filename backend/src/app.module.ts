import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { ClientController } from './client/client.controller';
import { FreelancerController } from './freelancer/freelancer.controller';
import { ClientModule } from './client/client.module';
import { FreelancerModule } from './freelancer/freelancer.module';

@Module({
  imports: [UserModule, ClientModule, FreelancerModule],
  controllers: [AppController, ClientController, FreelancerController],
  providers: [AppService, UserService],
})
export class AppModule {}
