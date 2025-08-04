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
  Prisma,
  Role,
} from '@prisma/client';
import { NotificationsService } from 'src/notifications/notifications.service';
import { StripeService } from 'src/stripe/stripe.service';
import { buildContractsFilter } from 'src/helpers/buildContractsFilter';
@Injectable()
export class ContractsService {
  constructor(
    private prisma: PrismaService,
    private notificationsService: NotificationsService,
    private stripeService: StripeService,
  ) {}

  async createContract(data: CreateContractDto) {
    return this.prisma.$transaction(async (tx) => {
      const client = await tx.clientProfile.findUnique({
        where: { id: data.clientId },
        include: { user: true },
      });
      if (!client) {
        throw new NotFoundException(
          `Client with ID ${data.clientId} not found`,
        );
      }

      const paymentMethods = await this.stripeService.getListPaymentMethods(
        client.user.stripeCustomerId,
      );

      if (paymentMethods.length === 0) {
        throw new BadRequestException('No payment method found');
      }
      const paymentMethod = paymentMethods.find((method) => method.isDefault);

      if (!paymentMethod) {
        throw new BadRequestException('No default payment method found');
      }

      const freelancer = await tx.freelancerProfile.findUnique({
        where: { id: data.freelancerId },
      });
      if (!freelancer) {
        throw new NotFoundException(
          `Freelancer with ID ${data.freelancerId} not found`,
        );
      }

      const job = await tx.job.findUnique({
        where: { id: data.jobId },
        include: { client: true },
      });
      if (!job) {
        throw new NotFoundException(`Job with ID ${data.jobId} not found`);
      }

      if (job.client.id !== data.clientId) {
        throw new BadRequestException('Client does not own this job');
      }

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

      const contract = await tx.contract.create({
        data: {
          job: { connect: { id: data.jobId } },
          client: { connect: { id: data.clientId } },
          freelancer: { connect: { id: data.freelancerId } },
          paymentMethodId: paymentMethod.id,
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
        include: {
          client: {
            select: {
              id: true,
              companyName: true,
              user: {
                select: {
                  fullName: true,
                  email: true,
                  avatarUrl: true,
                  verified: true,
                },
              },
            },
          },
          freelancer: {
            select: {
              id: true,
              title: true,
              user: {
                select: {
                  fullName: true,
                  email: true,
                  avatarUrl: true,
                  verified: true,
                  address: true,
                },
              },
            },
          },
          job: {
            select: {
              id: true,
              title: true,
              description: true,
              category: true,
            },
          },
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

  async findAllContractsForClient(
    limit?: number,
    page?: number,
    clientId?: string,
    status?: ContractStatus | 'all',
    searchQuery?: string,
    type?: string,
    date?: string,
  ) {
    const { where, orderBy } = buildContractsFilter({
      clientId,
      status,
      searchQuery,
      type,
      date,
    });

    if (!clientId) {
      throw new NotFoundException('Client not found');
    }

    try {
      const [contracts, totalCount] = await Promise.all([
        this.prisma.contract.findMany({
          skip: (page - 1) * limit,
          take: limit,
          where,
          include: {
            job: {
              select: {
                id: true,
                title: true,
                description: true,
                category: true,
              },
            },
            client: {
              select: {
                userId: true,
                companyName: true,
                user: {
                  select: {
                    fullName: true,
                    email: true,
                  },
                },
              },
            },
            freelancer: {
              select: {
                userId: true,
                title: true,
                user: {
                  select: {
                    fullName: true,
                    email: true,
                  },
                },
              },
            },
            milestone: {
              select: {
                id: true,
                title: true,
                description: true,
                amount: true,
                status: true,
                dueDate: true,
              },
              orderBy: { createdAt: 'asc' },
            },
          },
          orderBy,
        }),
        this.prisma.contract.count({ where }),
      ]);

      return {
        data: contracts,
        totalPage: Math.ceil(totalCount / limit),
        totalContracts: totalCount,
      };
    } catch (error) {
      throw new BadRequestException(
        `Failed to fetch contracts: ${error.message}`,
      );
    }
  }

  async findAllContractsForFreelancer(
    limit?: number,
    page?: number,
    freelancerId?: string,
    status?: ContractStatus | 'all',
    searchQuery?: string,
    type?: string,
    date?: string,
    sortedBy?: string,
  ) {
    const { where, orderBy } = buildContractsFilter({
      freelancerId,
      status,
      searchQuery,
      type,
      date,
      sortedBy,
    });
    if (!freelancerId) {
      throw new NotFoundException('Freelancer not found');
    }

    const [contracts, totalCount] = await Promise.all([
      this.prisma.contract.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where,
        include: {
          job: {
            select: {
              id: true,
              title: true,
              description: true,
              category: true,
            },
          },
          client: {
            select: {
              userId: true,
              companyName: true,
              user: {
                select: {
                  fullName: true,
                  email: true,
                },
              },
            },
          },
          freelancer: {
            select: {
              userId: true,
              title: true,
              user: {
                select: {
                  fullName: true,
                  email: true,
                },
              },
            },
          },
          milestone: {
            select: {
              id: true,
              title: true,
              description: true,
              amount: true,
              status: true,
              dueDate: true,
            },
            orderBy: { createdAt: 'asc' },
          },
        },
        orderBy,
      }),
      this.prisma.contract.count({ where }),
    ]);

    return {
      data: contracts,
      totalPage: Math.ceil(totalCount / limit),
      totalContracts: totalCount,
    };
  }

  async findOneContract(id: string) {
    const contract = await this.prisma.contract.findUnique({
      where: { id },
      include: {
        job: { select: { id: true, title: true, description: true } },
        client: { select: { userId: true, companyName: true, user: true } },
        freelancer: { select: { userId: true, title: true, user: true } },
        payments: true,
        reviews: true,
      },
    });

    if (!contract) {
      throw new NotFoundException(`Contract with ID ${id} not found`);
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
