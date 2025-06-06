import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ContractStatus, Prisma } from '@prisma/client';
import { CreateContractDto } from './dto/create-contract.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateContractDto } from './dto/update-contract.dto';

@Injectable()
export class ContractsService {
  constructor(private prisma: PrismaService) {}

  async createContract(data: CreateContractDto) {
    return this.prisma.$transaction(async (tx) => {
      const client = await tx.clientProfile.findUnique({
        where: { userId: data.clientId },
      });
      if (!client) {
        throw new NotFoundException(
          `Client with ID ${data.clientId} not found`,
        );
      }
      const freelancer = await tx.freelancerProfile.findUnique({
        where: { userId: data.freelancerId },
      });
      if (!freelancer) {
        throw new NotFoundException(
          `Freelancer with ID ${data.freelancerId} not found`,
        );
      }
      const job = await tx.job.findUnique({ where: { id: data.jobId } });
      if (!job) {
        throw new NotFoundException(`Job with ID ${data.jobId} not found`);
      }
      if (job.clientId !== data.clientId) {
        throw new BadRequestException('Client does not own this job');
      }

      // Check if contract already exists for this job and freelancer
      const existingContract = await tx.contract.findFirst({
        where: { jobId: data.jobId, freelancerId: data.freelancerId },
      });
      if (existingContract) {
        throw new BadRequestException(
          'Contract already exists for this job and freelancer',
        );
      }

      // Create contract
      const contract = await tx.contract.create({
        data: {
          jobId: data.jobId,
          clientId: data.clientId,
          freelancerId: data.freelancerId,
          status: ContractStatus.ACTIVE,
          startedAt: new Date(),
        },
      });

      // Create notification for freelancer
      await tx.notification.create({
        data: {
          userId: data.freelancerId,
          content: `A new contract has been created for job "${job.title}"`,
        },
      });

      return tx.contract.findUnique({
        where: { id: contract.id },
        include: {
          job: { select: { id: true, title: true } },
          client: { select: { userId: true, companyName: true } },
          freelancer: { select: { userId: true, title: true } },
        },
      });
    });
  }

  async findAllContracts(params: {
    skip?: number;
    take?: number;
    clientId?: string;
    freelancerId?: string;
    jobId?: string;
    status?: ContractStatus;
  }) {
    const { skip, take, clientId, freelancerId, jobId, status } = params;

    const where: Prisma.ContractWhereInput = {};
    if (clientId) where.clientId = clientId;
    if (freelancerId) where.freelancerId = freelancerId;
    if (jobId) where.jobId = jobId;
    if (status) where.status = status;

    return this.prisma.contract.findMany({
      skip,
      take,
      where,
      include: {
        job: { select: { id: true, title: true } },
        client: { select: { userId: true, companyName: true } },
        freelancer: { select: { userId: true, title: true } },
      },
      orderBy: { startedAt: 'desc' },
    });
  }

  async findOneContract(id: string) {
    const contract = await this.prisma.contract.findUnique({
      where: { id },
      include: {
        job: { select: { id: true, title: true } },
        client: { select: { userId: true, companyName: true } },
        freelancer: { select: { userId: true, title: true } },
        payments: { select: { id: true, amount: true, status: true } },
        reviews: { select: { id: true, rating: true, comment: true } },
      },
    });

    if (!contract) {
      throw new NotFoundException(`Contract with ID ${id} not found`);
    }

    return contract;
  }

  async updateContract(id: string, clientId: string, data: UpdateContractDto) {
    return this.prisma.$transaction(async (tx) => {
      const contract = await tx.contract.findUnique({ where: { id } });
      if (!contract) {
        throw new NotFoundException(`Contract with ID ${id} not found`);
      }
      if (contract.clientId !== clientId) {
        throw new BadRequestException('Client does not own this contract');
      }

      // Check if status is valid
      if (data.status && data.status !== contract.status) {
        if (
          contract.status === ContractStatus.COMPLETED ||
          contract.status === ContractStatus.CANCELLED
        ) {
          throw new BadRequestException(
            'Cannot update a completed or cancelled contract',
          );
        }
      }

      // Update contract
      await tx.contract.update({
        where: { id },
        data: {
          status: data.status,
          completedAt:
            data.status === ContractStatus.COMPLETED ||
            data.status === ContractStatus.CANCELLED
              ? new Date()
              : undefined,
        },
      });

      // Create notification for freelancer if status changes
      if (data.status && data.status !== contract.status) {
        const job = await tx.job.findUnique({ where: { id: contract.jobId } });
        if (job) {
          await tx.notification.create({
            data: {
              userId: contract.freelancerId,
              content: `Contract for job "${job.title}" updated to status ${data.status}`,
            },
          });
        }
      }

      return tx.contract.findUnique({
        where: { id },
        include: {
          job: { select: { id: true, title: true } },
          client: { select: { userId: true, companyName: true } },
          freelancer: { select: { userId: true, title: true } },
        },
      });
    });
  }

  async completeContract(id: string, clientId: string) {
    return this.prisma.$transaction(async (tx) => {
      // Check if contract and ownership
      const contract = await tx.contract.findUnique({
        where: { id },
        include: { job: { select: { title: true } } },
      });
      if (!contract) {
        throw new NotFoundException(`Contract with ID ${id} not found`);
      }
      if (contract.clientId !== clientId) {
        throw new BadRequestException('Client does not own this contract');
      }
      if (contract.status !== ContractStatus.ACTIVE) {
        throw new BadRequestException('Contract is not active');
      }

      // Update contract to COMPLETED
      await tx.contract.update({
        where: { id },
        data: {
          status: ContractStatus.COMPLETED,
          completedAt: new Date(),
        },
      });

      // Create notification for freelancer
      await tx.notification.create({
        data: {
          userId: contract.freelancerId,
          content: `Contract for job "${contract.job.title}" has been completed`,
        },
      });

      return tx.contract.findUnique({
        where: { id },
        include: {
          job: { select: { id: true, title: true } },
          client: { select: { userId: true, companyName: true } },
          freelancer: { select: { userId: true, title: true } },
        },
      });
    });
  }

  async cancelContract(id: string, clientId: string) {
    return this.prisma.$transaction(async (tx) => {
      const contract = await tx.contract.findUnique({
        where: { id },
        include: { job: { select: { title: true } } },
      });
      if (!contract) {
        throw new NotFoundException(`Contract with ID ${id} not found`);
      }
      if (contract.clientId !== clientId) {
        throw new BadRequestException('Client does not own this contract');
      }
      if (contract.status !== ContractStatus.ACTIVE) {
        throw new BadRequestException('Contract is not active');
      }

      // Update contract to CANCELLED
      await tx.contract.update({
        where: { id },
        data: {
          status: ContractStatus.CANCELLED,
          completedAt: new Date(),
        },
      });

      // Create notification for freelancer
      await tx.notification.create({
        data: {
          userId: contract.freelancerId,
          content: `Contract for job "${contract.job.title}" has been cancelled`,
        },
      });

      return tx.contract.findUnique({
        where: { id },
        include: {
          job: { select: { id: true, title: true } },
          client: { select: { userId: true, companyName: true } },
          freelancer: { select: { userId: true, title: true } },
        },
      });
    });
  }
}
