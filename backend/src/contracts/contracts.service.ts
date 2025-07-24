import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import {
  ContractStatus,
  ContractType,
  MilestoneStatus,
  NotificationType,
  Role,
} from '@prisma/client';
import { NotificationsService } from 'src/notifications/notifications.service';

@Injectable()
export class ContractsService {
  constructor(
    private prisma: PrismaService,
    private notificationsService: NotificationsService,
  ) {}

  async createContract(data: CreateContractDto) {
    console.log(data);
    return this.prisma.$transaction(async (tx) => {
      // Check if client exists
      const client = await tx.clientProfile.findUnique({
        where: { id: data.clientId },
      });
      if (!client) {
        throw new NotFoundException(
          `Client with ID ${data.clientId} not found`,
        );
      }

      // Check if freelancer exists
      const freelancer = await tx.freelancerProfile.findUnique({
        where: { id: data.freelancerId },
      });
      if (!freelancer) {
        throw new NotFoundException(
          `Freelancer with ID ${data.freelancerId} not found`,
        );
      }

      // Check if job exists
      const job = await tx.job.findUnique({
        where: { id: data.jobId },
        include: { client: true },
      });
      if (!job) {
        throw new NotFoundException(`Job with ID ${data.jobId} not found`);
      }

      // Check if client owns the job
      if (job.client.id !== data.clientId) {
        throw new BadRequestException('Client does not own this job');
      }

      // Check if contract already exists for this job and freelancer
      const existingContract = await tx.contract.findFirst({
        where: {
          jobId: data.jobId,
          freelancerId: data.freelancerId,
        },
      });
      if (existingContract) {
        throw new BadRequestException(
          'Contract already exists for this job and freelancer',
        );
      }

      // Create contract
      const contract = await tx.contract.create({
        data: {
          job: { connect: { id: data.jobId } },
          client: { connect: { id: data.clientId } },
          freelancer: { connect: { id: data.freelancerId } },
          title: data.title,
          description: data.description,
          status: ContractStatus.ACTIVE,
          contractType: job.jobType,
          hourlyRate: data.hourlyRate ?? null,
          totalPrice: data.fixedPrice ?? null,
          projectDuration: data.projectDuration,
          startedAt: data.startedAt,
          completedAt: null,
          canceledAt: null,
        },
      });

      if (
        contract.contractType === ContractType.FIXED_PRICE &&
        data.milestone
      ) {
        for (const m of data.milestone) {
          await tx.milestone.create({
            data: {
              contractId: contract.id,
              title: m.title,
              description: m.description,
              amount: m.amount ?? 0,
              dueDate: m.dueDate,
              status: MilestoneStatus.PENDING,
            },
          });
        }
      }

      // Create notification for freelancer using notifications service
      await this.notificationsService.notifyContractCreated(
        freelancer.userId,
        job.title,
        NotificationType.CREATE_CONTRACT,
        tx,
      );

      return contract;
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

    const where: any = {};
    if (clientId) where.clientId = clientId;
    if (freelancerId) where.freelancerId = freelancerId;
    if (jobId) where.jobId = jobId;
    if (status) where.status = status;

    return this.prisma.contract.findMany({
      skip,
      take,
      where,
      include: {
        job: { select: { id: true, title: true, description: true } },
        client: { select: { userId: true, companyName: true } },
        freelancer: { select: { userId: true, title: true } },
      },
      orderBy: { startedAt: 'desc' },
    });
  }

  async findOneContract(id: string, userId: string, userRole: Role) {
    const contract = await this.prisma.contract.findUnique({
      where: { id },
      include: {
        job: { select: { id: true, title: true, description: true } },
        client: { select: { userId: true, companyName: true } },
        freelancer: { select: { userId: true, title: true } },
        payments: true,
        reviews: true,
      },
    });

    if (!contract) {
      throw new NotFoundException(`Contract with ID ${id} not found`);
    }

    // Check if user has access to this contract
    const hasAccess =
      (userRole === Role.CLIENT && contract.clientId === userId) ||
      (userRole === Role.FREELANCER && contract.freelancerId === userId);

    if (!hasAccess) {
      throw new BadRequestException('You do not have access to this contract');
    }

    return contract;
  }

  async updateContract(id: string, clientId: string, data: UpdateContractDto) {
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
      if (contract.status === ContractStatus.COMPLETED) {
        throw new BadRequestException('Cannot update completed contract');
      }
      if (contract.status === ContractStatus.CANCELLED) {
        throw new BadRequestException('Cannot update cancelled contract');
      }

      // Update contract
      const updatedContract = await tx.contract.update({
        where: { id },
        data,
        include: {
          job: { select: { id: true, title: true } },
          client: { select: { userId: true, companyName: true } },
          freelancer: { select: { userId: true, title: true } },
        },
      });

      // Create notification for freelancer if status changed
      // if (data.status && data.status !== contract.status) {
      //   await this.notificationsService.notifyContractUpdated(
      //     contract.freelancerId,
      //     contract.job.title,
      //     data.status,
      //     tx,
      //   );
      // }

      return updatedContract;
    });
  }

  async completeContract(id: string, clientId: string) {
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

      // Update contract to COMPLETED
      await tx.contract.update({
        where: { id },
        data: {
          status: ContractStatus.COMPLETED,
          completedAt: new Date(),
        },
      });

      // Create notification for freelancer using notifications service
      await this.notificationsService.notifyContractCompleted(
        contract.freelancerId,
        contract.job.title,
        tx,
      );

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

      // Create notification for freelancer using notifications service
      await this.notificationsService.notifyContractCancelled(
        contract.freelancerId,
        contract.job.title,
        tx,
      );

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
