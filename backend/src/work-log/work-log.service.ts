import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWorkLogDto } from './dto/create-work-log.dto';

@Injectable()
export class WorkLogService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateWorkLogDto) {
    const { freelancerId, contractId, hours, loggedAt, endTime, ...rest } =
      data;
    return this.prisma.workLog.create({
      data: {
        ...rest,
        loggedAt,
        hours,
        freelancer: { connect: { id: freelancerId } },
        contract: { connect: { id: contractId } },
        endTime,
      },
    });
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
