import { PrismaService } from './../prisma/prisma.service';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Role, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { EmailService } from 'src/message/email.service';

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    private emailService: EmailService,
  ) {}

  async findAll() {
    return await this.prismaService.user.findMany();
  }

  async findById(id: string) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { id },
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  async findOne(email: string) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { email },
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
        throw new BadRequestException('Email da ton tai');
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
          role: data.role as unknown as Role,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async updatePartialById(data: Partial<User>) {
    try {
      return this.prismaService.user.update({
        where: { id: data.id },
        data,
      });
    } catch (error) {
      console.log(error);
    }
  }
  async updatePartial(data: Partial<User>) {
    try {
      return this.prismaService.user.update({
        where: { email: data.email },
        data,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id: string) {
    try {
      await this.prismaService.user.delete({
        where: {
          id: id,
        },
      });

      return `Deleted user ${id}`;
    } catch (error) {
      return 'User not found';
    }
  }

  async verifyEmail(token: string) {
    try {
      console.log('======= Email Verification Debug =======');
      console.log('Received token:', token);
      console.log('Token length:', token.length);

      // First try direct query to check if token exists
      const dbCheck = await this.prismaService.$queryRaw`
        SELECT * FROM "User" WHERE "verificationToken" = ${token}
      `;
      console.log('Direct DB query result:', dbCheck);

      // Try with findFirst
      const user = await this.prismaService.user.findFirst({
        where: { verificationToken: token },
      });
      console.log('Prisma findFirst result:', user);
      // Log both for comparison

      if (dbCheck && Array.isArray(dbCheck) && dbCheck.length > 0) {
        console.log(
          'DB direct query found user, but Prisma findFirst did not:',
          user === null,
        );
      }

      if (!user) {
        throw new BadRequestException('Token k hop le');
      }

      await this.prismaService.user.update({
        where: { id: user.id },
        data: {
          verified: true,
          verificationToken: null, // Xóa token sau khi xác thực
        },
      });

      return 'email verified';
    } catch (error) {
      console.error('Verification error:', error);
      throw new InternalServerErrorException('Lỗi khi xác thực email.');
    }
  }
}
