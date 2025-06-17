import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateJobDto } from './dto/create-job.dto';

@Injectable()
export class JobsService {
  constructor(private readonly prisma: PrismaService) {}

  async createJob(clientId: string, data: CreateJobDto) {
    return this.prisma.$transaction(async (tx) => {
      const client = await tx.clientProfile.findUnique({
        where: { userId: clientId },
      });
      if (!client) {
        throw new NotFoundException(`Client with ID ${clientId} not found`);
      }

      if (data.skillIds && data.skillIds.length > 0) {
        const skills = await tx.skill.findMany({
          where: { id: { in: data.skillIds } },
        });
        if (skills.length !== data.skillIds.length) {
          throw new BadRequestException('Some skills not found');
        }
      }

      // Create job
      const job = await tx.job.create({
        data: {
          clientId,
          title: data.title,
          description: data.description,
          category: data.category,
          budget: data.budget,
          type: data.type,
        },
      });

      // Link skills to job
      if (data.skillIds && data.skillIds.length > 0) {
        await tx.jobSkill.createMany({
          data: data.skillIds.map((skillId) => ({
            jobId: job.id,
            skillId,
          })),
        });
      }

      // Return job with skills
      return tx.job.findUnique({
        where: { id: job.id },
        include: {
          skills: {
            select: { skill: { select: { id: true, name: true } } },
          },
          client: { select: { userId: true, companyName: true } },
        },
      });
    });
  }

  async findOneJob(id: string) {
    const job = await this.prisma.job.findUnique({
      where: { id },
      include: {
        skills: { select: { skill: { select: { id: true, name: true } } } },
        client: { select: { userId: true, companyName: true } },
        proposals: { select: { id: true, freelancerId: true, status: true } },
      },
    });

    if (!job) {
      throw new NotFoundException(`Job with ID ${id} not found`);
    }

    return job;
  }

  async updateJob(id: string, clientId: string, data: CreateJobDto) {
    return this.prisma.$transaction(async (tx) => {
      // Check job and client
      const job = await tx.job.findUnique({ where: { id } });
      if (!job) {
        throw new NotFoundException(`Job with ID ${id} not found`);
      }
      if (job.clientId !== clientId) {
        throw new BadRequestException('Client does not own this job');
      }

      // Check skills if exists
      if (data.skillIds) {
        const skills = await tx.skill.findMany({
          where: { id: { in: data.skillIds } },
        });
        if (skills.length !== data.skillIds.length) {
          throw new BadRequestException('Some skills not found');
        }

        // Delete current skills
        await tx.jobSkill.deleteMany({ where: { jobId: id } });

        // Add new skills
        await tx.jobSkill.createMany({
          data: data.skillIds.map((skillId) => ({
            jobId: id,
            skillId,
          })),
        });
      }

      // Update job
      await tx.job.update({
        where: { id },
        data: {
          title: data.title,
          description: data.description,
          category: data.category,
          budget: data.budget,
          type: data.type,
        },
      });

      return tx.job.findUnique({
        where: { id },
        include: {
          skills: { select: { skill: { select: { id: true, name: true } } } },
          client: { select: { userId: true, companyName: true } },
        },
      });
    });
  }

  async deleteJob(id: string, clientId: string) {
    return this.prisma.$transaction(async (tx) => {
      // Check job and client
      const job = await tx.job.findUnique({ where: { id } });
      if (!job) {
        throw new NotFoundException(`Job with ID ${id} not found`);
      }
      if (job.clientId !== clientId) {
        throw new BadRequestException('Client does not own this job');
      }

      // Check if job has active contract
      const activeContracts = await tx.contract.count({
        where: { jobId: id, status: 'ACTIVE' },
      });
      if (activeContracts > 0) {
        throw new BadRequestException(
          'Cannot delete job with active contracts',
        );
      }

      // Delete related records
      await tx.jobSkill.deleteMany({ where: { jobId: id } });
      await tx.userSavedJob.deleteMany({ where: { jobId: id } });
      await tx.proposal.deleteMany({ where: { jobId: id } });

      // Delete job
      await tx.job.delete({ where: { id } });

      return { message: `Job ${id} deleted successfully` };
    });
  }

  async searchJobs(query: string) {
    return this.prisma.job.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
        ],
      },
    });
  }
}
