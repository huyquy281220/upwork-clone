import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateUserDto, UserResponseDto } from './dto';
import { UserService } from './user.service';
import {
  Controller,
  Get,
  Body,
  Delete,
  Param,
  Query,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Express } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<UserResponseDto[]> {
    return this.userService.findAll();
  }

  @Get('/get-client-by-jobId/:jobId')
  async getClientByJobId(@Param('jobId') jobId: string) {
    return this.userService.findClientByJobId(jobId);
  }

  @Post('request-verify-email')
  async requestVerifyEmail(@Body('email') email: string) {
    return this.userService.requestToVerifyEmail(email);
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

  @Post('/:id/upload-avatar')
  @UseInterceptors(FileInterceptor('image'))
  uploadImage(
    @Param('id') userId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.userService.uploadAvatar(userId, file);
  }

  @Patch('/:userId/update')
  async update(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return this.userService.updatePartialById(userId, updateUserDto);
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: string): Promise<string> {
    return this.userService.delete(id);
  }
}
