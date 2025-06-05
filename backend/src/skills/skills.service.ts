import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SkillItemDto } from './dto/update-skills.dto';

@Injectable()
export class SkillsService {
  constructor(private prismaService: PrismaService) {}

  async updateUserSkills(userId: string, skills: SkillItemDto[]) {
    try {
      // 1. Get existing skills
      const existing = await this.prismaService.userSkill.findMany({
        where: { userId },
        include: { skill: true },
      });

      // 2. Determine operations
      const existingSkillIds = existing.map((s) => s.skillId);
      const incomingSkillIds = skills.map((s) => s.skillId);

      // Skills to delete (exist but not in incoming)
      const toDelete = existingSkillIds.filter(
        (id) => !incomingSkillIds.includes(id),
      );

      // Skills to update (exist in both)
      const toUpdate = skills.filter((s) =>
        existingSkillIds.includes(s.skillId),
      );

      // Skills to create (new)
      const toCreate = skills.filter(
        (s) => !existingSkillIds.includes(s.skillId),
      );

      // 3. Execute operations in transaction
      return this.prismaService.$transaction(async (tx) => {
        // Delete removed skills
        if (toDelete.length > 0) {
          await tx.userSkill.deleteMany({
            where: {
              userId,
              skillId: { in: toDelete },
            },
          });
        }

        // Update existing skills
        await Promise.all(
          toUpdate.map((skill) =>
            tx.userSkill.update({
              where: { userId_skillId: { userId, skillId: skill.skillId } },
              data: {
                proficiency: skill.proficiency,
              },
            }),
          ),
        );

        // Create new skills
        if (toCreate.length > 0) {
          await tx.userSkill.createMany({
            data: toCreate.map((skill) => ({
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
    } catch (error) {
      console.error('Error updating skills:', error);
      throw new BadRequestException('Failed to update skills');
    }
  }

  async getUserSkills(userId: string) {
    return this.prismaService.userSkill.findMany({
      where: { userId },
      include: { skill: true },
      orderBy: { skill: { name: 'asc' } },
    });
  }

  async getAllSkills() {
    return this.prismaService.skill.findMany({
      orderBy: { name: 'asc' },
    });
  }
}
