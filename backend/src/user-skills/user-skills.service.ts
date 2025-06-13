import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserSkillsService {
  constructor(private prismaService: PrismaService) {}

  async getUserSkills(userId: string) {
    return this.prismaService.userSkill.findMany({
      where: { userId },
      select: {
        userId: true,
        proficiency: true,
      },
    });
  }

  /**
   * Synchronize skill associations for a freelancer
   * Adds new skills and removes existing skills not in the input list
   * @param userId - The ID of the freelancer
   * @param skillIds - Array of skill IDs to synchronize
   * @returns Updated user with freelancer profile and skills
   */
  async createUserSkills(userId: string, skillIds: string[]) {
    // Check if freelancer exists
    const freelancer = await this.prismaService.freelancerProfile.findUnique({
      where: { userId },
    });
    if (!freelancer) {
      throw new NotFoundException(`Freelancer with ID ${userId} not found`);
    }

    // Validate input: skillIds cannot be empty or contain null/undefined
    if (!skillIds || skillIds.length === 0 || skillIds.some((id) => !id)) {
      throw new BadRequestException(
        'Skill IDs must be a non-empty array of valid strings',
      );
    }

    // Check if all skillIds exist in the Skill table
    const existingSkills = await this.prismaService.skill.findMany({
      where: { id: { in: skillIds } },
    });
    if (existingSkills.length !== skillIds.length) {
      throw new NotFoundException('Some skills not found');
    }

    // Fetch existing user skills
    const existingUserSkills = await this.prismaService.userSkill.findMany({
      where: { userId },
      select: { skillId: true }, // Only need skillId for comparison
    });

    // Identify skills to add (in input but not in existing)
    const skillsToAdd = skillIds.filter(
      (skillId) => !existingUserSkills.some((us) => us.skillId === skillId),
    );

    // Identify skills to delete (in existing but not in input)
    const skillsToDelete = existingUserSkills
      .filter((us) => !skillIds.includes(us.skillId))
      .map((us) => us.skillId);

    // Create new skill associations
    if (skillsToAdd.length > 0) {
      await this.prismaService.userSkill.createMany({
        data: skillsToAdd.map((skillId) => ({
          userId,
          skillId,
        })),
      });
    }

    // Delete extra skill associations
    if (skillsToDelete.length > 0) {
      await this.prismaService.userSkill.deleteMany({
        where: {
          userId,
          skillId: { in: skillsToDelete },
        },
      });
    }

    // Return updated user with skills
    return this.prismaService.user.findUnique({
      where: { id: userId },
      include: {
        freelancerProfile: {
          include: {
            skills: {
              select: {
                skillId: true,
                proficiency: true,
                skill: true,
              },
            },
          },
        },
      },
    });
  }

  /**
   * Delete skill associations for a freelancer
   * @param userId - The ID of the freelancer
   * @param skillIds - Array of skill IDs to delete
   * @returns Updated user with freelancer profile and skills
   */
  async deleteUserSkills(userId: string, skillIds: string[]) {
    // Check if freelancer exists
    const freelancer = await this.prismaService.freelancerProfile.findUnique({
      where: { userId },
    });
    if (!freelancer) {
      throw new NotFoundException(`Freelancer with ID ${userId} not found`);
    }

    // Check if all skill associations exist
    const existingUserSkills = await this.prismaService.userSkill.findMany({
      where: { userId, skillId: { in: skillIds } },
    });
    if (existingUserSkills.length !== skillIds.length) {
      throw new NotFoundException('Some skill associations not found');
    }

    // Delete skill associations
    await this.prismaService.userSkill.deleteMany({
      where: { userId, skillId: { in: skillIds } },
    });

    // Return updated user with skills
    return this.prismaService.user.findUnique({
      where: { id: userId },
      include: {
        freelancerProfile: {
          include: {
            skills: {
              select: {
                skillId: true,
                proficiency: true,
                skill: true,
              },
            },
          },
        },
      },
    });
  }
}
