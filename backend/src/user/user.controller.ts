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

  @Get('/:id')
  async findById(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  // @Post('create')
  // async create(@Body() createUser: CreateUserDto) {
  //   return this.userService.create(createUser);
  // }

  @Patch('update')
  async update(@Body() data: Partial<CreateUserDto>) {
    return this.userService.updatePartial(data);
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }

  @Get('verify-email')
  async verifyEmail(@Query('token') token: string) {
    return this.userService.verifyEmail(token);
  }
}
