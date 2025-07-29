import { PrismaService } from './../prisma/prisma.service';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';
import { Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { EmailService } from 'src/email/email.service';
import { cloudinary } from 'src/provider/cloudinary';
import * as fs from 'fs';
import * as util from 'util';
import { Express } from 'express';
import { JwtService } from '@nestjs/jwt';
import { StripeService } from 'src/stripe/stripe.service';

const unlinkFile = util.promisify(fs.unlink);

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    private emailService: EmailService,
    private jwtService: JwtService,
    private stripeService: StripeService,
  ) {}

  async findClientByJobId(jobId: string) {
    try {
      const client = await this.prismaService.clientProfile.findFirst({
        where: { jobs: { some: { id: jobId } } },
        include: {
          user: { select: { address: true, fullName: true } },
        },
      });

      const totalJobs = await this.prismaService.job.count({
        where: {
          clientId: client.id,
        },
      });

      console.log(client);

      return { client, totalJobs };
    } catch (error) {
      console.error(error);
      throw new NotFoundException('Client not found');
    }
  }

  async findAll() {
    return await this.prismaService.user.findMany({
      include: {
        clientProfile: true,
        freelancerProfile: {
          include: {
            languages: true,
            education: true,
            skills: true,
          },
        },
      },
    });
  }

  async findById(id: string) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { id },
        include: {
          clientProfile: true,
          freelancerProfile: {
            include: {
              languages: true,
              education: true,
              skills: true,
            },
          },
        },
      });
      if (!user) {
        throw new NotFoundException(
          'Account does not exist. Please sign up or try again later.',
        );
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, refreshToken, verificationToken, ...result } = user;
      return result;
    } catch (error) {
      throw new NotFoundException(
        'Account does not exist. Please sign up or try again later.',
      );
    }
  }

  async findByIdIncludeRefreshToken(id: string) {
    return await this.prismaService.user.findUnique({
      where: { id },
      include: {
        clientProfile: true,
        freelancerProfile: true,
      },
    });
  }

  async findByEmail(email: string) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { email },
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
      return user;
    } catch (error) {
      throw new NotFoundException(
        'Account does not exist. Please sign up or try again later.',
      );
    }
  }

  async findByIdWithPassword(id: string) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { id },
        include: {
          clientProfile: true,
          freelancerProfile: true,
        },
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      throw new NotFoundException('User not found');
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

      if (data.role === Role.CLIENT) {
        await this.stripeService.createCustomer(data.email, data.fullName);
      } else if (data.role === Role.FREELANCER) {
        await this.stripeService.createConnectedAccount(data.email);
      }

      return this.prismaService.user.create({
        data: {
          ...data,
          password: hashedPassword,
          // verificationToken,
          avatarUrl: '',
          phoneNumber: '',
          verified: false,
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

  async updatePartialById(userId: string, data: UpdateUserDto) {
    try {
      const { clientProfile, freelancerProfile, ...userData } = data;

      return this.prismaService.user.update({
        where: { id: userId },
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

  async requestToVerifyEmail(email: string) {
    const token = this.jwtService.sign(
      { email },
      {
        secret: process.env.JWT_SECRET,
        expiresIn: '2m',
      },
    );

    try {
      const user = await this.prismaService.user.findUnique({
        where: { email },
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      if (user.verified) {
        throw new BadRequestException('User is already verified');
      }

      await this.prismaService.user.update({
        where: { email },
        data: {
          verificationToken: token,
        },
      });

      await this.emailService.sendVerificationEmail(email, token);
    } catch (error) {
      throw new Error('Failed to send email');
    }
  }

  async verifyEmail(token: string) {
    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });

      const user = await this.prismaService.user.findFirst({
        where: { email: payload.email },
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
      if (error.name === 'TokenExpiredError') {
        return 'Token đã hết hạn';
      }
      console.error('Verification error:', error);
      throw new InternalServerErrorException('Lỗi khi xác thực email.');
    }
  }

  async uploadAvatar(userId: string, file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    try {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: 'avatar',
      });

      if (!result || !result.secure_url || !result.public_id) {
        throw new BadRequestException(
          'Cloudinary upload did not return expected result',
        );
      }

      await unlinkFile(file.path);
      await this.prismaService.user.update({
        where: { id: userId },
        data: { avatarUrl: result.secure_url },
      });

      return {
        url: result.secure_url,
        public_id: result.public_id,
      };
    } catch (error) {
      // Delete file if error
      if (file?.path) {
        await unlinkFile(file.path).catch(() => null);
      }
      throw new BadRequestException('Failed to upload to Cloudinary');
    }
  }
}
