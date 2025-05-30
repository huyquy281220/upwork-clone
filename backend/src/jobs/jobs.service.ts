import { Injectable } from '@nestjs/common';
import { Job } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JobsService {
  constructor(private readonly prisma: PrismaService) {}

  async createJob(data: Job) {
    return this.prisma.job.create({
      data,
    });
  }

  async getJobs() {
    return this.prisma.job.findMany();
  }

  async getJobById(id: string) {
    return this.prisma.job.findUnique({
      where: { id },
    });
  }

  async updateJob(id: string, data: Job) {
    return this.prisma.job.update({
      where: { id },
      data,
    });
  }

  async deleteJob(id: string) {
    return this.prisma.job.delete({
      where: { id },
    });
  }
}
