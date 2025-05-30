import {
  Controller,
  Get,
  Post,
  Delete,
  Req,
  Body,
  Param,
} from '@nestjs/common';
import { SavedJobsService } from './saved-jobs.service';

@Controller('user/saved-jobs')
export class SavedJobsController {
  constructor(private readonly savedJobsService: SavedJobsService) {}

  @Get()
  async getSavedJobs(@Req() req) {
    const userId = req.user.id;
    const savedJobIds = await this.savedJobsService.getUserSavedJobIds(userId);
    return { savedJobIds };
  }

  @Post()
  async saveJob(@Req() req, @Body() { jobId }: { jobId: string }) {
    const userId = req.user.id;
    await this.savedJobsService.saveJob(userId, jobId);
    return { success: true };
  }

  @Delete(':jobId')
  async unsaveJob(@Req() req, @Param('jobId') jobId: string) {
    const userId = req.user.id;
    await this.savedJobsService.unsaveJob(userId, jobId);
    return { success: true };
  }
}
