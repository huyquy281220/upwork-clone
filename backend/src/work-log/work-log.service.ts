import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWorkLogDto } from './dto/create-work-log.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class WorkLogService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
  ) {}

  async create(data: CreateWorkLogDto) {
    try {
      const { freelancerId, contractId, hours, loggedAt, endTime, ...rest } =
        data;

      return this.prisma.workLog.create({
        data: {
          ...rest,
          loggedAt,
          hours,
          freelancer: { connect: { userId: freelancerId } },
          contract: { connect: { id: contractId } },
          endTime,
        },
      });
    } catch (error) {
      console.log(error);
      throw new Error('Failed to create work log');
    }
  }

  findByContract(contractId: string) {
    return this.prisma.workLog.findMany({
      where: { contractId },
      orderBy: { loggedAt: 'desc' },
    });
  }

  findByFreelancer(freelancerId: string) {
    return this.prisma.workLog.findMany({
      where: { freelancerId },
      orderBy: { loggedAt: 'desc' },
    });
  }
}
