import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWorkLogDto } from './dto/create-worklog.dto';

@Injectable()
export class WorkLogService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateWorkLogDto) {
    return this.prisma.workLog.create({ data });
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
