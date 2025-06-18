import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Query,
  Patch,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get('/:clientId/get-all-jobs')
  getAllJobs(@Param('clientId') clientId: string) {
    return this.jobsService.findAllJobs(clientId);
  }
  @Get('/:id')
  getJobById(@Param('id') id: string) {
    return this.jobsService.findOneJob(id);
  }

  @Get('/search')
  searchJobs(@Query('query') query: string) {
    return this.jobsService.searchJobs(query);
  }

  @Post('/:clientId/create')
  createJob(@Param('clientId') clientId: string, @Body() data: CreateJobDto) {
    return this.jobsService.createJob(clientId, data);
  }

  @Patch('/:clientId/update/:id')
  updateJob(
    @Param('id') id: string,
    @Param('clientId') clientId: string,
    @Body() data: UpdateJobDto,
  ) {
    return this.jobsService.updateJob(id, clientId, data);
  }

  @Delete('/:clientId/delete/:id')
  deleteJob(@Param('id') id: string, @Param('clientId') clientId: string) {
    return this.jobsService.deleteJob(id, clientId);
  }
}
