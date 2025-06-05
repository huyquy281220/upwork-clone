import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EducationItemDto } from './dto/update-education.dto';

@Injectable()
export class EducationService {
  constructor(private prismaService: PrismaService) {}

  async updateUserEducation(userId: string, education: EducationItemDto[]) {
    try {
      // 1. Get all current user education from DB
      const existing = await this.prismaService.education.findMany({
        where: { freelancerId: userId },
      });

      // 2. Classify operations
      const existingIds = existing.map((e) => e.id); // ["edu123", "edu456"]
      const incomingIds = education.filter((e) => e.id).map((e) => e.id); // ["edu123"]

      // Education to DELETE: exist in DB but not in request
      const toDelete = existingIds.filter((id) => !incomingIds.includes(id)); // ["edu456"]

      // Education to UPDATE: have ID and that ID exists in DB
      const toUpdate = education.filter(
        (e) => e.id && existingIds.includes(e.id),
      ); // [{ id: "edu123", school: "Updated University", ... }]

      // Education to CREATE: no ID (completely new)
      const toCreate = education.filter((e) => !e.id); // [{ school: "New University", ... }]

      console.log('Education Operations:', { toDelete, toUpdate, toCreate });

      // 3. Execute operations in transaction
      return this.prismaService.$transaction(async (tx) => {
        // DELETE: Remove education not in request
        if (toDelete.length > 0) {
          await tx.education.deleteMany({
            where: { id: { in: toDelete } },
          });
        }

        // UPDATE: Update education with ID
        for (const edu of toUpdate) {
          await tx.education.update({
            where: { id: edu.id },
            data: {
              school: edu.school,
              startYear: edu.startYear,
              endYear: edu.endYear,
              degree: edu.degree,
              areaOfStudy: edu.areaOfStudy,
              description: edu.description,
            },
          });
        }

        // CREATE: Create new education without ID
        if (toCreate.length > 0) {
          await tx.education.createMany({
            data: toCreate.map((edu) => ({
              school: edu.school,
              startYear: edu.startYear,
              endYear: edu.endYear,
              degree: edu.degree,
              areaOfStudy: edu.areaOfStudy,
              description: edu.description,
              freelancerId: userId,
            })),
          });
        }

        // Return updated user with education
        return tx.user.findUnique({
          where: { id: userId },
          include: {
            freelancerProfile: {
              include: { education: true },
            },
          },
        });
      });
    } catch (error) {
      console.error('Error updating education:', error);
      throw new BadRequestException('Failed to update education');
    }
  }

  async getUserEducation(userId: string) {
    return this.prismaService.education.findMany({
      where: { freelancerId: userId },
      orderBy: [
        { endYear: 'desc' }, // Newest first
        { startYear: 'desc' },
      ],
    });
  }
}
