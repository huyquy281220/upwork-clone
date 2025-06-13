import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EducationItemDto } from './dto/education.dto';

@Injectable()
export class EducationService {
  constructor(private prismaService: PrismaService) {}

  async getUserEducation(userId: string) {
    const freelancer = await this.prismaService.freelancerProfile.findUnique({
      where: { userId },
      include: { education: true },
    });
    if (!freelancer) {
      throw new NotFoundException(`Freelancer with ID ${userId} not found`);
    }
    return freelancer.education;
  }

  /**
   * Create multiple new education records for a freelancer
   * @param userId - The ID of the freelancer
   * @param education - Array of new education records to create
   * @returns Updated user with freelancer profile and education
   */
  async createUserEducation(userId: string, education: EducationItemDto[]) {
    // Check if freelancer exists
    const freelancer = await this.prismaService.freelancerProfile.findUnique({
      where: { userId },
    });
    if (!freelancer) {
      throw new NotFoundException(`Freelancer with ID ${userId} not found`);
    }

    // Validate input: new education records must not have IDs
    if (education.some((edu) => edu.id)) {
      throw new BadRequestException('New education records must not have IDs');
    }

    return this.prismaService.$transaction(async (tx) => {
      // Create new education records
      if (education.length > 0) {
        await tx.education.createMany({
          data: education.map((edu) => ({
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
  }

  /**
   * Update existing education records for a freelancer
   * @param userId - The ID of the freelancer
   * @param education - Array of education records to update (must include IDs)
   * @returns Updated user with freelancer profile and education
   */
  async updateUserEducation(userId: string, education: EducationItemDto[]) {
    // Check if freelancer exists
    const freelancer = await this.prismaService.freelancerProfile.findUnique({
      where: { userId },
    });
    if (!freelancer) {
      throw new NotFoundException(`Freelancer with ID ${userId} not found`);
    }

    // Validate input: all education records must have IDs
    if (education.some((edu) => !edu.id)) {
      throw new BadRequestException(
        'All education records to update must have IDs',
      );
    }

    // Check if all education records exist
    const existing = await this.prismaService.education.findMany({
      where: { freelancerId: userId, id: { in: education.map((e) => e.id!) } },
    });
    if (existing.length !== education.length) {
      throw new NotFoundException('Some education records not found');
    }

    return this.prismaService.$transaction(async (tx) => {
      // Update existing education records
      await Promise.all(
        education.map((edu) =>
          tx.education.update({
            where: { id: edu.id },
            data: {
              school: edu.school,
              startYear: edu.startYear,
              endYear: edu.endYear,
              degree: edu.degree,
              areaOfStudy: edu.areaOfStudy,
              description: edu.description,
            },
          }),
        ),
      );

      // Return updated user with education
      return tx.user.findUnique({
        where: { id: userId },
        include: {
          freelancerProfile: {
            include: {
              education: {
                orderBy: { createdAt: 'asc' },
              },
            },
          },
        },
      });
    });
  }

  /**
   * Delete education records for a freelancer
   * @param userId - The ID of the freelancer
   * @param educationIds - Array of education record IDs to delete
   * @returns Updated user with freelancer profile and education
   */
  async deleteUserEducation(userId: string, educationIds: string[]) {
    // Check if freelancer exists
    const freelancer = await this.prismaService.freelancerProfile.findUnique({
      where: { userId },
    });
    if (!freelancer) {
      throw new NotFoundException(`Freelancer with ID ${userId} not found`);
    }

    // Check if all education records exist
    const existing = await this.prismaService.education.findMany({
      where: { freelancerId: userId, id: { in: educationIds } },
    });
    if (existing.length !== educationIds.length) {
      throw new NotFoundException('Some education records not found');
    }

    return this.prismaService.$transaction(async (tx) => {
      // Delete education records
      await tx.education.deleteMany({
        where: { id: { in: educationIds } },
      });

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
  }
}
