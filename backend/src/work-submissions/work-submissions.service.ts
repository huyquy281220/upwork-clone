import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class WorkSubmissionsService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.WorkSubmissionCreateInput) {
    return this.prisma.workSubmission.create({ data });
  }

  findAll() {
    return this.prisma.workSubmission.findMany({
      include: { workLog: true },
    });
  }

  findOne(id: string) {
    return this.prisma.workSubmission.findUnique({
      where: { id },
      include: { workLog: true },
    });
  }

  update(id: string, data: Prisma.WorkSubmissionUpdateInput) {
    return this.prisma.workSubmission.update({
      where: { id },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.workSubmission.delete({ where: { id } });
  }
}
