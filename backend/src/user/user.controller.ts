import { CreateUserDto, UpdateUserDto, UserResponseDto } from './dto';
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
  async findAll(): Promise<UserResponseDto[]> {
    return this.userService.findAll();
  }

  @Get('verify-email')
  async verifyEmail(@Query('token') token: string): Promise<string> {
    console.log('Verification endpoint hit with token:', token);
    return this.userService.verifyEmail(token);
  }

  @Get('/:id')
  async findById(@Param('id') id: string): Promise<UserResponseDto> {
    return this.userService.findById(id);
  }

  @Patch('update')
  async update(@Body() updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
    return this.userService.updatePartialById(updateUserDto);
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: string): Promise<string> {
    return this.userService.delete(id);
  }
}
