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
              userId: clientId,
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
            skillId: skill,
          })),
        });
      }

      return job;
    });
  }

  async getOneJob(id: string) {
    const job = await this.prisma.job.findUnique({
      where: { id },
      include: {
        skills: { select: { skill: { select: { id: true } } } },
        client: { select: { id: true } },
        proposals: { select: { id: true, freelancerId: true, status: true } },
      },
    });

    if (!job) {
      throw new NotFoundException(`Job with ID ${id} not found`);
    }

    const { skills, ...restOfJob } = job;

    return {
      ...restOfJob,
      skills: skills.map((s) => s.skill.id),
    };
  }

  async getBestMatchesJob(freelancerId: string) {
    const freelancer = await this.prisma.freelancerProfile.findUnique({
      where: { id: freelancerId },
      include: { skills: true },
    });

    if (!freelancer) {
      throw new NotFoundException('Freelancer not found');
    }

    const freelancerSkills = freelancer.skills;
    const skillIds = freelancerSkills.map((s) => s.skillId);
    if (skillIds.length === 0) {
      const freelancerTitle = freelancer.title ?? ' ';
      const keyword = freelancerTitle.split(' ');
      const jobsMatchByTitle = await this.prisma.job.findMany({
        where: {
          OR: keyword.map((word) => ({
            title: { contains: word, mode: 'insensitive' as const },
          })),
        },
        include: {
          skills: { select: { skill: { select: { id: true, name: true } } } },
        },
        take: 20,
        orderBy: { createdAt: 'desc' },
      });

      return jobsMatchByTitle.map((job) => ({
        ...job,
        skills: job.skills.map((s) => s.skill),
      }));
    }
    const jobsMatchBySkills = await this.prisma.job.findMany({
      where: {
        skills: {
          some: {
            skillId: {
              in: skillIds,
            },
          },
        },
      },
      include: {
        skills: { select: { skill: { select: { id: true, name: true } } } },
      },
      take: 20,
      orderBy: { createdAt: 'desc' },
    });

    return jobsMatchBySkills.map((job) => ({
      ...job,
      skills: job.skills.map((s) => s.skill),
    }));
  }

  async getMostRecentJobs() {
    const mostRecentJobs = await this.prisma.job.findMany({
      include: {
        skills: { select: { skill: { select: { id: true, name: true } } } },
      },
      take: 20,
      orderBy: { createdAt: 'desc' },
    });

    return mostRecentJobs.map((job) => ({
      ...job,
      skills: job.skills.map((s) => s.skill),
    }));
  }

  async getJobsWithPagination(clientId: string, limit: number, page: number) {
    try {
      const [jobs, totalJobs] = await this.prisma.$transaction([
        this.prisma.job.findMany({
          where: { client: { userId: clientId } },
          include: {
            skills: { select: { skill: { select: { id: true, name: true } } } },
          },
          orderBy: { createdAt: 'desc' },
          take: limit,
          skip: (page - 1) * limit,
        }),
        this.prisma.job.count({
          where: { client: { userId: clientId } },
        }),
      ]);

      return {
        data: jobs,
        // totalJobsCount: totalJobs,
        totalPages: Math.ceil(totalJobs / limit),
      };
    } catch (error) {
      console.log(error);
    }
  }

  async getAllJobs(clientId: string) {
    return this.prisma.job.findMany({
      where: { client: { userId: clientId } },
      include: {
        skills: { select: { skill: { select: { id: true, name: true } } } },
      },
      orderBy: { createdAt: 'desc' },
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
          where: { id: { in: data.skills } },
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
            skillId: skill,
          })),
        });
      }

      // Update job
      await tx.job.update({
        where: { id },
        data: {
          title: data.title,
          description: data.description,
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
      // await tx.userSavedJob.deleteMany({ where: { jobId: id } });
      // await tx.proposal.deleteMany({ where: { jobId: id } });

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
