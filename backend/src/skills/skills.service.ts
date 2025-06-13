import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SkillItemDto } from './dto/skills.dto';

@Injectable()
export class SkillsService {
  constructor(private prismaService: PrismaService) {}

  /**
   * Create new skill associations for a freelancer
   * @param userId - The ID of the freelancer
   * @param skills - Array of new skill associations to create
   * @returns Updated user with freelancer profile and skills
   */
  async createUserSkills(userId: string, skills: SkillItemDto[]) {
    // Check if freelancer exists
    const freelancer = await this.prismaService.freelancerProfile.findUnique({
      where: { userId },
    });
    if (!freelancer) {
      throw new NotFoundException(`Freelancer with ID ${userId} not found`);
    }

    // Check if all skillIds exist
    const existingSkills = await this.prismaService.skill.findMany({
      where: { id: { in: skills.map((s) => s.skillId) } },
    });
    if (existingSkills.length !== skills.length) {
      throw new NotFoundException('Some skills not found');
    }

    // Check for existing associations
    const existingUserSkills = await this.prismaService.userSkill.findMany({
      where: { userId, skillId: { in: skills.map((s) => s.skillId) } },
    });
    if (existingUserSkills.length > 0) {
      throw new BadRequestException(
        'Some skills are already associated with this user',
      );
    }

    return this.prismaService.$transaction(async (tx) => {
      // Create new skill associations
      if (skills.length > 0) {
        await tx.userSkill.createMany({
          data: skills.map((skill) => ({
            userId,
            skillId: skill.skillId,
            proficiency: skill.proficiency,
          })),
        });
      }

      // Return updated user with skills
      return tx.user.findUnique({
        where: { id: userId },
        include: {
          freelancerProfile: {
            include: {
              skills: {
                include: { skill: true },
              },
            },
          },
        },
      });
    });
  }

  /**
   * Update proficiency of existing skill associations for a freelancer
   * @param userId - The ID of the freelancer
   * @param skills - Array of skill associations to update (must include skillId)
   * @returns Updated user with freelancer profile and skills
   */
  async updateUserSkills(userId: string, skills: SkillItemDto[]) {
    // Check if freelancer exists
    const freelancer = await this.prismaService.freelancerProfile.findUnique({
      where: { userId },
    });
    if (!freelancer) {
      throw new NotFoundException(`Freelancer with ID ${userId} not found`);
    }

    // Validate input: all skills must have skillId
    if (skills.some((skill) => !skill.skillId)) {
      throw new BadRequestException('All skills must have a skillId');
    }

    // Check if all skill associations exist
    const existingUserSkills = await this.prismaService.userSkill.findMany({
      where: { userId, skillId: { in: skills.map((s) => s.skillId) } },
    });
    if (existingUserSkills.length !== skills.length) {
      throw new NotFoundException('Some skill associations not found');
    }

    return this.prismaService.$transaction(async (tx) => {
      // Update existing skill associations
      await Promise.all(
        skills.map((skill) =>
          tx.userSkill.update({
            where: { userId_skillId: { userId, skillId: skill.skillId } },
            data: {
              proficiency: skill.proficiency,
            },
          }),
        ),
      );

      // Return updated user with skills
      return tx.user.findUnique({
        where: { id: userId },
        include: {
          freelancerProfile: {
            include: {
              skills: {
                include: { skill: true },
              },
            },
          },
        },
      });
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

    return this.prismaService.$transaction(async (tx) => {
      // Delete skill associations
      await tx.userSkill.deleteMany({
        where: {
          userId,
          skillId: { in: skillIds },
        },
      });

      // Return updated user with skills
      return tx.user.findUnique({
        where: { id: userId },
        include: {
          freelancerProfile: {
            include: {
              skills: {
                include: { skill: true },
              },
            },
          },
        },
      });
    });
  }

  async getUserSkills(userId: string) {
    return this.prismaService.userSkill.findMany({
      where: { userId },
      include: { skill: true },
    });
  }

  async getAllSkills() {
    return this.prismaService.skill.findMany({
      orderBy: { name: 'asc' },
    });
  }
}
