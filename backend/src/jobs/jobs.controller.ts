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
import { CreateJobDto } from './dto/create-job.dto';
@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get(':id')
  getJobById(@Param('id') id: string) {
    return this.jobsService.findOneJob(id);
  }

  @Post()
  createJob(@Param('clientId') clientId: string, @Body() data: CreateJobDto) {
    return this.jobsService.createJob(clientId, data);
  }

  @Put(':id')
  updateJob(
    @Param('id') id: string,
    @Param('clientId') clientId: string,
    @Body() data: CreateJobDto,
  ) {
    return this.jobsService.updateJob(id, clientId, data);
  }

  @Delete(':id')
  deleteJob(@Param('id') id: string, @Param('clientId') clientId: string) {
    return this.jobsService.deleteJob(id, clientId);
  }
}
