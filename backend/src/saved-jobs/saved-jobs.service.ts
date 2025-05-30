import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SavedJobsService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserSavedJobIds(userId: string): Promise<string[]> {
    const savedJobs = await this.prisma.userSavedJob.findMany({
      where: { userId },
      select: { jobId: true },
    });
    return savedJobs.map((item) => item.jobId);
  }

  async saveJob(userId: string, jobId: string): Promise<void> {
    await this.prisma.userSavedJob.upsert({
      where: {
        userId_jobId: { userId, jobId },
      },
      create: { userId, jobId },
      update: {},
    });
  }

  async unsaveJob(userId: string, jobId: string): Promise<void> {
    await this.prisma.userSavedJob.deleteMany({
      where: { userId, jobId },
    });
  }
}
