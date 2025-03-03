import { PrismaService } from './../prisma/prisma.service';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from '@prisma/client';
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

  async create(data: CreateUserDto) {
    const { password } = data;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
      const verificationToken = crypto.randomBytes(32).toString('hex');

      await this.emailService.sendVerificationEmail(
        data.email,
        verificationToken,
      );

      return this.prismaService.user.create({
        data: {
          ...data,
          password: hashedPassword,
          avatarUrl: '',
          phoneNumber: '',
          role: data.role as unknown as Role,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
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
      const user = await this.prismaService.user.findUnique({
        where: { verificationToken: token },
      });

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
    } catch (error) {
      throw new InternalServerErrorException('Lỗi khi xác thực email.');
    }
  }
}
