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

  async getUserLanguages(userId: string) {
    return this.prismaService.language.findMany({
      where: { freelancerId: userId },
    });
  }

  async createUserLanguages(userId: string, languages: LanguageItemDto[]) {
    console.log(languages);
    const freelancer = await this.prismaService.freelancerProfile.findUnique({
      where: { userId },
    });
    if (!freelancer) {
      throw new NotFoundException(`Freelancer with ID ${userId} not found`);
    }

    // Check if languages already exist
    const existingLanguages = await this.prismaService.language.findMany({
      where: {
        name: {
          in: languages.map((lang) => lang.name),
        },
      },
    });

    if (existingLanguages.length > 0) {
      throw new BadRequestException('Languages already exist');
    }

    // Create new languages
    if (languages.length > 0) {
      await this.prismaService.language.createMany({
        data: languages.map((lang) => ({
          name: lang.name,
          proficiency: lang.proficiency,
          freelancerId: userId,
        })),
      });
    }

    // Return user with languages
    return this.prismaService.user.findUnique({
      where: { id: userId },
      include: {
        freelancerProfile: {
          include: { languages: true },
        },
      },
    });
  }

  async updateUserLanguages(userId: string, languages: LanguageItemDto[]) {
    const freelancer = await this.prismaService.freelancerProfile.findUnique({
      where: { userId },
    });
    if (!freelancer) {
      throw new NotFoundException(`Freelancer with ID ${userId} not found`);
    }

    // Check input data
    if (languages.some((lang) => !lang.id)) {
      throw new BadRequestException('All languages to update must have IDs');
    }

    // Check if languages exist
    const existing = await this.prismaService.language.findMany({
      where: { freelancerId: userId, id: { in: languages.map((l) => l.id!) } },
    });
    if (existing.length !== languages.length) {
      throw new NotFoundException('Some languages not found');
    }

    // Update languages
    await Promise.all(
      languages.map((lang) =>
        this.prismaService.language.update({
          where: { id: lang.id },
          data: {
            name: lang.name,
            proficiency: lang.proficiency,
          },
        }),
      ),
    );

    // Return user with languages
    return this.prismaService.user.findUnique({
      where: { id: userId },
      include: {
        freelancerProfile: {
          include: { languages: true },
        },
      },
    });
  }

  async deleteUserLanguages(userId: string, languageIds: string[]) {
    const freelancer = await this.prismaService.freelancerProfile.findUnique({
      where: { userId },
    });
    if (!freelancer) {
      throw new NotFoundException(`Freelancer with ID ${userId} not found`);
    }

    // Check if languages exist
    const existing = await this.prismaService.language.findMany({
      where: { freelancerId: userId, id: { in: languageIds } },
    });
    if (existing.length !== languageIds.length) {
      throw new NotFoundException('Some languages not found');
    }

    // Delete languages
    await this.prismaService.language.deleteMany({
      where: { id: { in: languageIds } },
    });

    // Return user with languages
    return this.prismaService.user.findUnique({
      where: { id: userId },
      include: {
        freelancerProfile: {
          include: { languages: true },
        },
      },
    });
  }
}
