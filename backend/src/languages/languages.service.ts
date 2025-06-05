import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LanguageItemDto } from './dto/update-languages.dto';

@Injectable()
export class LanguagesService {
  constructor(private prismaService: PrismaService) {}

  async updateUserLanguages(userId: string, languages: LanguageItemDto[]) {
    try {
      const freelancer = await this.prismaService.freelancerProfile.findUnique({
        where: { userId },
      });
      if (!freelancer) {
        throw new NotFoundException(`Freelancer not found`);
      }

      const existing = await this.prismaService.language.findMany({
        where: { freelancerId: userId },
      });

      // 2. Determine operations
      const existingIds = existing.map((l) => l.id);
      const incomingIds = languages.filter((l) => l.id).map((l) => l.id);

      // Languages to delete (exist but not in incoming)
      const toDelete = existingIds.filter((id) => !incomingIds.includes(id));

      // Languages to update (have ID)
      const toUpdate = languages.filter(
        (l) => l.id && existingIds.includes(l.id),
      );

      // Languages to create (no ID)
      const toCreate = languages.filter((l) => !l.id);

      // 3. Execute operations in transaction
      return this.prismaService.$transaction(async (tx) => {
        if (toDelete.length > 0) {
          await tx.language.deleteMany({
            where: { id: { in: toDelete } },
          });
        }

        // Update existing languages
        await Promise.all(
          toUpdate.map((lang) =>
            tx.language.update({
              where: { id: lang.id },
              data: {
                name: lang.name,
                level: lang.level,
              },
            }),
          ),
        );

        // Create new languages
        if (toCreate.length > 0) {
          await tx.language.createMany({
            data: toCreate.map((lang) => ({
              name: lang.name,
              level: lang.level,
              freelancerId: userId,
            })),
          });
        }

        // Return updated user with languages
        return tx.user.findUnique({
          where: { id: userId },
          include: {
            freelancerProfile: {
              include: { languages: true },
            },
          },
        });
      });
    } catch (error) {
      console.error('Error updating languages:', error);
      throw new BadRequestException('Failed to update languages');
    }
  }

  async getUserLanguages(userId: string) {
    return this.prismaService.language.findMany({
      where: { freelancerId: userId },
      orderBy: { createdAt: 'asc' },
    });
  }
}
