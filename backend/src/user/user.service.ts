import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { scrypt } from 'crypto';
@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}
  private readonly users: [] = [];

  //   create() {
  //     return this.create();
  //   }
  findAll() {
    return this.prismaService.user.findMany();
  }

  create(data: CreateUserDto) {
    return this.prismaService.user.create({
      data: {
        ...data,
        avatarUrl: '',
        phoneNumber: '',
      },
    });
  }

  delete(id: string) {
    try {
      this.prismaService.user.delete({
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
