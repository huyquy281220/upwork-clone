import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWorkLogDto } from './dto/create-work-log.dto';
import { UserService } from 'src/user/user.service';
import { UpdateWorkLogDto } from './dto/update-work-log.dto';

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
      return this.prisma.$transaction(async (prisma) => {
        await prisma.workLog.delete({
          where: { id },
        });

        await prisma.workSubmission.deleteMany({
          where: { workLogId: id },
        });
      });
    } catch (error) {
      console.log(error);
      throw new Error('Failed to delete work log');
    }
  }
}
