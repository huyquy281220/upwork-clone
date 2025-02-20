import { Module } from '@nestjs/common';
import { FreelancerService } from './freelancer.service';

@Module({
  providers: [FreelancerService]
})
export class FreelancerModule {}
