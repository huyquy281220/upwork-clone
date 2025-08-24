import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateJobDto } from './dto/create-job.dto';
import { JobType, Prisma } from '@prisma/client';
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

    let categoryName = '';

    if (skills && skills.length > 0) {
      // Get skills with their categories
      const skillsWithCategories = await this.prisma.skill.findMany({
        where: { id: { in: skills } },
        include: { category: true },
      });

      // Count skills per category
      const categoryCount = new Map<string, number>();

      skillsWithCategories.forEach((skill) => {
        const categoryName = skill.category.name;
        categoryCount.set(
          categoryName,
          (categoryCount.get(categoryName) || 0) + 1,
        );
      });

      // Find category with most skills
      if (categoryCount.size > 0) {
        categoryName = Array.from(categoryCount.entries()).reduce(
          (maxEntry, currentEntry) =>
            currentEntry[1] > maxEntry[1] ? currentEntry : maxEntry,
        )[0];
      }
    }

    return this.prisma.$transaction(async (tx) => {
      const job = await tx.job.create({
        data: {
          ...rest,
          category: categoryName,
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
        skills: { select: { skill: { select: { id: true, name: true } } } },
        client: {
          include: {
            user: {
              select: {
                id: true,
                fullName: true,
                avatarUrl: true,
                address: true,
                verified: true,
                createdAt: true,
              },
            },
          },
        },
        proposals: { select: { id: true, freelancerId: true, status: true } },
      },
    });

    if (!job) {
      throw new NotFoundException(`Job with ID ${id} not found`);
    }
    const { skills, ...restOfJob } = job;

    const totalJobs = await this.prisma.job.count({
      where: { clientId: job.clientId },
    });

    const hiredJobs = await this.prisma.job.count({
      where: {
        clientId: job.clientId,
        contracts: {
          some: {
            status: {
              in: ['ACTIVE', 'COMPLETED'],
            },
          },
        },
      },
    });

    const openJobs = await this.prisma.job.count({
      where: {
        clientId: job.clientId,
        contracts: {
          none: {
            status: {
              in: ['ACTIVE', 'COMPLETED'],
            },
          },
        },
      },
    });

    const hireRate =
      totalJobs > 0 ? Math.round((hiredJobs / totalJobs) * 100) : 0;

    // Calculate total spent by the client
    const totalSpent = await this.prisma.payment.aggregate({
      where: {
        contract: {
          clientId: job.clientId,
        },
        status: {
          in: ['PAID', 'SUCCEEDED'],
        },
      },
      _sum: {
        amount: true,
      },
    });

    return {
      job: {
        ...restOfJob,
        skills: skills.map((s) => s.skill),
      },
      totalJobs,
      openJobs,
      hireRate,
      totalSpent: totalSpent._sum.amount || 0,
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

    const skillIds = freelancer.skills.map((s) => s.skillId);
    let jobs = [];

    // 1. First, try to find jobs by skills if they exist
    if (skillIds.length > 0) {
      jobs = await this.prisma.job.findMany({
        where: {
          skills: {
            some: {
              skillId: { in: skillIds },
            },
          },
        },
        include: {
          skills: { select: { skill: { select: { id: true, name: true } } } },
        },
        take: 20,
        orderBy: { createdAt: 'desc' },
      });
    }

    // 2. If no jobs were found by skills OR freelancer had no skills,
    //    fallback to searching by title.
    if (jobs.length === 0) {
      const freelancerTitle = freelancer.title ?? '';
      const keywords = freelancerTitle.split(' ').filter(Boolean); // Filter out empty strings

      if (keywords.length > 0) {
        jobs = await this.prisma.job.findMany({
          where: {
            OR: keywords.map((word) => ({
              title: { contains: word, mode: 'insensitive' as const },
            })),
          },
          include: {
            skills: { select: { skill: { select: { id: true, name: true } } } },
          },
          take: 20,
          orderBy: { createdAt: 'desc' },
        });
      }
    }

    if (jobs.length === 0) {
      // This part is changed to use a raw query
      const randomJobsResult = await this.prisma.$queryRaw<any[]>(
        Prisma.sql`SELECT * FROM "Job" ORDER BY RANDOM() LIMIT 10`,
      );

      // Raw queries don't automatically include relations, so we have to fetch them separately
      const jobIds = randomJobsResult.map((job) => job.id);
      jobs = await this.prisma.job.findMany({
        where: {
          id: { in: jobIds },
        },
        include: {
          skills: { select: { skill: { select: { id: true, name: true } } } },
        },
      });
    }

    // 3. Map the final result (either from skills or title search)
    return jobs.map((job) => ({
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

  async getPaginatedJobs(clientId: string, limit: number, page: number) {
    try {
      const [jobs, totalJobs] = await Promise.all([
        this.prisma.job.findMany({
          where: { client: { userId: clientId } },
          include: {
            skills: {
              select: { skill: { select: { id: true, name: true } } },
            },
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
        totalPages: Math.ceil(totalJobs / limit),
      };
    } catch (error) {
      console.error('Error fetching jobs with pagination:', error);
      throw new Error('Failed to fetch jobs');
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
