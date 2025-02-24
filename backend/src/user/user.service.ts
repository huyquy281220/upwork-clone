import { PrismaService } from './../prisma/prisma.service';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async findAll() {
    return await this.prismaService.user.findMany();
  }

  async create(data: CreateUserDto) {
    const { password } = data;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
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
}
