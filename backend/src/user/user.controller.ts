import { Prisma } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import {
  Controller,
  Get,
  Body,
  Delete,
  Param,
  Query,
  Patch,
} from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get('verify-email')
  async verifyEmail(@Query('token') token: string) {
    console.log('Verification endpoint hit with token:', token);
    return this.userService.verifyEmail(token);
  }

  @Get('/:id')
  async findById(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Patch('update')
  async update(@Body() data: Prisma.UserUpdateInput & { email: string }) {
    return this.userService.updatePartial(data);
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
