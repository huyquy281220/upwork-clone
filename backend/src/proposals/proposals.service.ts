import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ContractStatus, ProposalStatus } from '@prisma/client';
import { CreateProposalDto } from './dto/create-proposal';
import { UpdateProposalDto } from './dto/update-proposal.dto';
import { cloudinary } from 'src/provider/cloudinary';
import * as fs from 'fs';
import * as util from 'util';
import { Express } from 'express';
import { buildProposalFilters } from 'src/helpers/buildProposalFilters';
import { NotificationsGateway } from 'src/socket/socket.gateway';

const unlinkFile = util.promisify(fs.unlink);

@Injectable()
export class ProposalsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly notificationGateway: NotificationsGateway,
  ) {}

  async getPaginatedProposals(
    freelancerId: string,
    limit: number,
    page: number,
    searchQuery?: string,
    statusFilter?: string,
    dateFilter?: string,
    budgetFilter?: string,
    sortedBy?: string,
  ) {
    const { where, orderBy } = buildProposalFilters({
      freelancerId,
      searchQuery,
      statusFilter,
      dateFilter,
      budgetFilter,
      sortedBy,
    });

    try {
      const [proposals, totalProposals] = await Promise.all([
        this.prismaService.proposal.findMany({
          where,
          orderBy,
          include: {
            job: {
              select: {
                title: true,
                description: true,
                hourlyRateMin: true,
                hourlyRateMax: true,
                fixedPrice: true,
              },
            },
            freelancer: {
              include: {
                user: {
                  select: {
                    fullName: true,
                    address: true,
                    verified: true,
                    avatarUrl: true,
                  },
                },
              },
            },
          },
          take: limit,
          skip: (page - 1) * limit,
        }),
        this.prismaService.proposal.count({
          where: { freelancerId },
        }),
      ]);

      return {
        data: proposals,
        totalPage: Math.ceil(totalProposals / limit),
        totalProposals,
      };
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch proposals');
    }
  }

  async getPaginatedProposalsByJob(
    jobId: string,
    limit: number,
    page: number,
    searchQuery?: string,
    sortedBy?: string,
  ) {
    const { where, orderBy } = buildProposalFilters({
      jobId,
      searchQuery,
      sortedBy,
    });

    try {
      const [proposals, totalProposals] = await Promise.all([
        this.prismaService.proposal.findMany({
          where,
          include: {
            job: {
              include: {
                skills: {
                  include: {
                    skill: {
                      select: { id: true, name: true },
                    },
                  },
                },
              },
            },
            freelancer: {
              include: {
                user: {
                  select: {
                    fullName: true,
                    avatarUrl: true,
                    address: true,
                    verified: true,
                  },
                },
                skills: {
                  include: {
                    skill: {
                      select: { id: true, name: true },
                    },
                  },
                },
              },
            },
          },
          orderBy,
          take: limit,
          skip: (page - 1) * limit,
        }),
        this.prismaService.proposal.count({
          where: { jobId },
        }),
      ]);

      const conciseProposals = proposals.map((proposal) => ({
        ...proposal,
        job: {
          ...proposal.job,
          skills: proposal.job.skills.map((s) => ({
            id: s.skill.id,
            name: s.skill.name,
          })),
        },
        freelancer: {
          ...proposal.freelancer,
          skills: proposal.freelancer.skills.map((s) => ({
            id: s.skill.id,
            name: s.skill.name,
          })),
        },
      }));

      return {
        data: conciseProposals,
        totalProposals,
        totalPages: Math.ceil(totalProposals / limit),
      };
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch proposals');
    }
  }

  async createProposal(data: CreateProposalDto, file: Express.Multer.File) {
    let urlOfCv;
    if (file) {
      urlOfCv = await this.uploadCv(file);
    }

    return this.prismaService.$transaction(async (tx) => {
      const freelancer = await tx.freelancerProfile.findUnique({
        where: { id: data.freelancerId },
      });
      if (!freelancer) {
        throw new NotFoundException('Freelancer not found');
      }

      const job = await tx.job.findUnique({
        where: { id: data.jobId },
      });
      if (!job) {
        throw new NotFoundException('Job not found');
      }

      // Check if freelancer is already a proposal for this job
      const existingProposal = await tx.proposal.findFirst({
        where: { freelancerId: data.freelancerId, jobId: data.jobId },
      });

      if (existingProposal) {
        throw new BadRequestException(
          'Freelancer already has a proposal for this job',
        );
      }

      const client = await tx.user.findFirst({
        where: {
          clientProfile: {
            id: job.clientId,
          },
        },
      });

      const proposal = await tx.proposal.create({
        data: {
          job: { connect: { id: data.jobId } },
          freelancer: { connect: { id: data.freelancerId } },
          timeline: data.timeline,
          coverLetter: data.coverLetter,
          pricing: Number(data.pricing),
          attachment: urlOfCv ?? '',
          status: ProposalStatus.PENDING,
        },
      });

      const notification = await tx.notification.create({
        data: {
          userId: client.id,
          content: `A freelancer has submitted a proposal to your job "${job.title}"`,
        },
      });

      this.notificationGateway.sendNotificationToUser(client.id, notification);

      return tx.proposal.findUnique({
        where: { id: proposal.id },
        include: {
          freelancer: { select: { userId: true, title: true } },
          job: { select: { id: true, title: true } },
        },
      });
    });
  }

  async findOneProposal(id: string) {
    const proposal = await this.prismaService.proposal.findUnique({
      where: { id },
      include: {
        freelancer: { select: { userId: true, title: true } },
        job: { select: { id: true, title: true, clientId: true } },
      },
    });

    if (!proposal) {
      throw new NotFoundException(`Proposal with ID ${id} not found`);
    }

    return proposal;
  }

  async updateProposal(
    proposalId: string,
    data: UpdateProposalDto,
    file: Express.Multer.File,
  ) {
    return this.prismaService.$transaction(async (tx) => {
      const proposal = await tx.proposal.findUnique({
        where: { id: proposalId },
      });
      if (!proposal) {
        throw new NotFoundException(`Proposal with ID ${proposalId} not found`);
      }
      if (proposal.freelancerId !== data.freelancerId) {
        throw new BadRequestException('Freelancer does not own this proposal');
      }

      const urlOfCv = await this.uploadCv(file);

      // Update proposal
      await tx.proposal.update({
        where: { id: proposalId },
        data: {
          coverLetter: data.coverLetter,
          pricing: Number(data.pricing),
          timeline: data.timeline,
          attachment: urlOfCv ?? null,
          status: data.status,
        },
      });

      // If status changes, create notification for client
      if (data.status && data.status !== proposal.status) {
        const job = await tx.job.findUnique({ where: { id: proposal.jobId } });
        if (job) {
          await tx.notification.create({
            data: {
              userId: job.clientId,
              content: `Proposal for job "${job.title}" updated to status ${data.status}`,
            },
          });
        }
      }

      return tx.proposal.findUnique({
        where: { id: proposalId },
        include: {
          freelancer: { select: { userId: true, title: true } },
          job: { select: { id: true, title: true } },
        },
      });
    });
  }

  async deleteProposal(proposalId: string, freelancerId: string) {
    return this.prismaService.$transaction(async (tx) => {
      const proposal = await tx.proposal.findUnique({
        where: { id: proposalId },
      });
      if (!proposal) {
        throw new NotFoundException(`Proposal with ID ${proposalId} not found`);
      }
      if (proposal.freelancerId !== freelancerId) {
        throw new BadRequestException('Freelancer does not own this proposal');
      }
      if (proposal.status === ProposalStatus.ACCEPTED) {
        throw new BadRequestException('Cannot delete an accepted proposal');
      }

      // Delete proposal
      await tx.proposal.delete({ where: { id: proposalId } });

      return { message: `Proposal ${proposalId} deleted successfully` };
    });
  }

  async acceptProposal(proposalId: string, clientId: string) {
    return this.prismaService.$transaction(async (tx) => {
      // Check proposal
      const proposal = await tx.proposal.findUnique({
        where: { id: proposalId },
        include: { job: { select: { clientId: true } } },
      });
      if (!proposal) {
        throw new NotFoundException(`Proposal with ID ${proposalId} not found`);
      }
      if (proposal.job.clientId !== clientId) {
        throw new BadRequestException('Client does not own this job');
      }
      if (proposal.status !== ProposalStatus.PENDING) {
        throw new BadRequestException('Proposal is not in pending status');
      }

      // Update proposal status
      await tx.proposal.update({
        where: { id: proposalId },
        data: { status: ProposalStatus.ACCEPTED },
      });

      // Create contract
      const contract = await tx.contract.create({
        data: {
          jobId: proposal.jobId,
          clientId,
          freelancerId: proposal.freelancerId,
          status: ContractStatus.ACTIVE,
          startedAt: new Date(),
        },
      });

      // Create notification for freelancer
      await tx.notification.create({
        data: {
          userId: proposal.freelancerId,
          content: `Your proposal for job "${proposal.jobId}" has been accepted`,
        },
      });

      return tx.contract.findUnique({
        where: { id: contract.id },
        include: {
          job: { select: { id: true, title: true } },
          freelancer: { select: { userId: true, title: true } },
          client: { select: { userId: true, companyName: true } },
        },
      });
    });
  }

  async rejectProposal(proposalId: string, clientId: string) {
    return this.prismaService.$transaction(async (tx) => {
      const proposal = await tx.proposal.findUnique({
        where: { id: proposalId },
        include: { job: { select: { clientId: true, title: true } } },
      });
      if (!proposal) {
        throw new NotFoundException(`Proposal with ID ${proposalId} not found`);
      }
      if (proposal.job.clientId !== clientId) {
        throw new BadRequestException('Client does not own this job');
      }
      if (proposal.status !== ProposalStatus.PENDING) {
        throw new BadRequestException('Proposal is not in pending status');
      }

      await tx.proposal.update({
        where: { id: proposalId },
        data: { status: ProposalStatus.REJECTED },
      });

      await tx.notification.create({
        data: {
          userId: proposal.freelancerId,
          content: `Your proposal for job "${proposal.jobId}" has been rejected`,
        },
      });

      const freelancer = await tx.freelancerProfile.findFirst({
        where: {
          proposals: {
            some: { id: proposalId },
          },
        },
      });

      this.notificationGateway.sendNotificationToUser(freelancer.userId, {
        content: `Your proposal for job "${proposal.job.title}" has been rejected`,
      });

      return { message: `Proposal ${proposalId} rejected successfully` };
    });
  }

  async uploadCv(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    try {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: 'cv',
        resource_type: 'raw',
      });

      if (!result || !result.secure_url || !result.public_id) {
        throw new BadRequestException(
          'Cloudinary upload did not return expected result',
        );
      }

      await unlinkFile(file.path);

      return result.secure_url;
    } catch (error) {
      // Delete file if error
      if (file?.path) {
        await unlinkFile(file.path).catch(() => null);
      }
      console.log(error);
      throw new BadRequestException('Failed to upload to Cloudinary');
    }
  }
}
