import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWorkLogDto } from './dto/create-work-log.dto';
import { UpdateWorkLogDto } from './dto/update-work-log.dto';

@Injectable()
export class WorkLogService {
  constructor(private prisma: PrismaService) {}

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

  async update(id: string, data: UpdateWorkLogDto) {
    try {
      return this.prisma.workLog.update({
        where: { id },
        data,
      });
    } catch (error) {
      console.log(error);
      throw new Error('Failed to update work log');
    }
  }

  async delete(id: string) {
    try {
      await this.prisma.workLog.delete({ where: { id } });

      return {
        message: 'Work log deleted successfully',
      };
    } catch (error) {
      console.log(error);
      throw new Error('Failed to delete work log');
    }
  }
}
