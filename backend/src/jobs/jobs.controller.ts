import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { Job } from '@prisma/client';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get()
  getJobs() {
    return this.jobsService.getJobs();
  }

  @Get(':id')
  getJobById(@Param('id') id: string) {
    return this.jobsService.getJobById(id);
  }

  @Post()
  createJob(@Body() data: Job) {
    return this.jobsService.createJob(data);
  }

  @Put(':id')
  updateJob(@Param('id') id: string, @Body() data: Job) {
    return this.jobsService.updateJob(id, data);
  }

  @Delete(':id')
  deleteJob(@Param('id') id: string) {
    return this.jobsService.deleteJob(id);
  }
}
