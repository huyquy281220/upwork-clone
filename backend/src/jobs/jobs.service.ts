import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateJobDto } from './dto/create-job.dto';
import { JobType } from '@prisma/client';
import { UpdateJobDto } from './dto/update-job.dto';

@Injectable()
export class JobsService {
  constructor(private readonly prisma: PrismaService) {}

  async createJob(clientId: string, data: CreateJobDto) {
    const {
      jobType,
      hourlyRateMin,
      hourlyRateMax,
      fixedPrice,
      skills,
      ...rest
    } = data;

    const client = await this.prisma.clientProfile.findUnique({
      where: { userId: clientId },
    });

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    // Validate job type and rates
    if (jobType === JobType.HOURLY && (!hourlyRateMin || !hourlyRateMax)) {
      throw new BadRequestException('Hourly jobs require an hourly rate');
    }
    if (jobType === JobType.FIXED_PRICE && !fixedPrice) {
      throw new BadRequestException('Fixed-Price jobs require a fixed price');
    }

    return this.prisma.$transaction(async (tx) => {
      const job = await tx.job.create({
        data: {
          ...rest,
          client: {
            connect: {
              id: clientId,
            },
          },
          jobType,
          hourlyRateMin: jobType === JobType.HOURLY ? hourlyRateMin : null,
          hourlyRateMax: jobType === JobType.HOURLY ? hourlyRateMax : null,
          fixedPrice: jobType === JobType.FIXED_PRICE ? fixedPrice : null,
        },
      });

      // If skills are provided, create JobSkill records
      if (skills && skills.length > 0) {
        await tx.jobSkill.createMany({
          data: skills.map((skill) => ({
            jobId: job.id,
            skillId: skill.skillId,
          })),
        });
      }

      return job;
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

  async findAllJobs(clientId: string) {
    console.log(clientId);
    return this.prisma.job.findMany({
      where: { clientId },
      include: {
        skills: { select: { skill: { select: { id: true, name: true } } } },
      },
    });
  }

  async updateJob(id: string, clientId: string, data: UpdateJobDto) {
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
      if (data.skills) {
        const skills = await tx.skill.findMany({
          where: { id: { in: data.skills.map((skill) => skill.skillId) } },
        });
        if (skills.length !== data.skills.length) {
          throw new BadRequestException('Some skills not found');
        }

        // Delete current skills
        await tx.jobSkill.deleteMany({ where: { jobId: id } });

        // Add new skills
        await tx.jobSkill.createMany({
          data: data.skills.map((skill) => ({
            jobId: id,
            skillId: skill.skillId,
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
          jobType: data.jobType,
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
