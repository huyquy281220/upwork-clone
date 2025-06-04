import { PrismaService } from './../prisma/prisma.service';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Prisma, Role, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    private emailService: EmailService,
  ) {}

  async findAll() {
    return await this.prismaService.user.findMany({
      include: {
        clientProfile: true,
        freelancerProfile: true,
      },
    });
  }

  async findById(id: string) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { id },
        include: {
          clientProfile: true,
          freelancerProfile: true,
        },
      });
      if (!user) {
        throw new NotFoundException(
          'Account does not exist. Please sign up or try again later.',
        );
      }

      const { password, refreshToken, verificationToken, ...result } = user;
      return result;
    } catch (error) {
      throw new NotFoundException(
        'Account does not exist. Please sign up or try again later.',
      );
    }
  }

  async findOne(email: string) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { email },
        include: {
          clientProfile: true,
          freelancerProfile: true,
        },
      });
      if (!user) return null;
      return user;
    } catch (error) {
      throw new NotFoundException(
        'Account does not exist. Please sign up or try again later.',
      );
    }
  }

  async create(data: CreateUserDto) {
    const { password } = data;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
      const user = await this.prismaService.user.findUnique({
        where: { email: data.email },
      });

      if (user) {
        throw new BadRequestException('Email already exist');
      }

      const verificationToken = crypto.randomBytes(32).toString('hex');

      await this.emailService.sendVerificationEmail(
        data.email,
        verificationToken,
      );

      return this.prismaService.user.create({
        data: {
          ...data,
          password: hashedPassword,
          verificationToken,
          avatarUrl: '',
          phoneNumber: '',
          role: data.role.toUpperCase() as unknown as Role,

          ...(data.role === 'FREELANCER' && {
            freelancerProfile: {
              create: {},
            },
          }),

          ...(data.role === 'CLIENT' && {
            clientProfile: {
              create: { companyName: '', website: '', industry: '' },
            },
          }),
        },
        include: {
          clientProfile: true,
          freelancerProfile: true,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  // async updatePartialById(data: Partial<User>) {
  //   try {
  //     return this.prismaService.user.update({
  //       where: { id: data.id },
  //       data,
  //       include: {
  //         clientProfile: true,
  //         freelancerProfile: true,
  //       },
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  async updatePartialById(data: Prisma.UserUpdateInput & { id: string }) {
    try {
      const { clientProfile, freelancerProfile, ...userData } = data;

      return this.prismaService.user.update({
        where: { id: data.id },
        data: {
          ...userData,
          ...(clientProfile && {
            clientProfile: {
              update: clientProfile,
            },
          }),
          ...(freelancerProfile && {
            freelancerProfile: {
              update: freelancerProfile,
            },
          }),
        },
        include: {
          clientProfile: true,
          freelancerProfile: true,
        },
      });
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Failed to update user profile');
    }
  }

  async delete(id: string) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { id },
        include: {
          clientProfile: true,
          freelancerProfile: true,
        },
      });

      if (user.clientProfile) {
        await this.prismaService.clientProfile.delete({
          where: { userId: id },
        });
      }

      if (user.freelancerProfile) {
        await this.prismaService.freelancerProfile.delete({
          where: { userId: id },
        });
      }

      await this.prismaService.user.delete({
        where: {
          id,
        },
      });

      return `Deleted user ${id}`;
    } catch (error) {
      console.log(error);
      return 'User not found';
    }
  }

  async verifyEmail(token: string) {
    try {
      const user = await this.prismaService.user.findFirst({
        where: { verificationToken: token },
      });

      if (!user) {
        throw new BadRequestException('Token k hop le');
      }

      await this.prismaService.user.update({
        where: { id: user.id },
        data: {
          verified: true,
          verificationToken: null,
        },
        include: {
          clientProfile: true,
          freelancerProfile: true,
        },
      });

      return 'email verified';
    } catch (error) {
      console.error('Verification error:', error);
      throw new InternalServerErrorException('Lỗi khi xác thực email.');
    }
  }
}
