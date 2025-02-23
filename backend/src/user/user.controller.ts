import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Post('create')
  async create(@Body() createUser: CreateUserDto) {
    return this.userService.create(createUser);
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
