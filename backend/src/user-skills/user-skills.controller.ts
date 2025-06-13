import {
  Controller,
  Post,
  Delete,
  Param,
  Body,
  UsePipes,
  ValidationPipe,
  Get,
} from '@nestjs/common';
import { UserSkillsService } from './user-skills.service';

@Controller('user-skills/:userId')
export class UserSkillsController {
  constructor(private readonly userSkillsService: UserSkillsService) {}

  @Get()
  async getUserSkills(@Param('userId') userId: string) {
    return this.userSkillsService.getUserSkills(userId);
  }

  @Post('/create')
  @UsePipes(new ValidationPipe())
  async createUserSkills(
    @Param('userId') userId: string,
    @Body() skillIds: string[],
  ) {
    return this.userSkillsService.createUserSkills(userId, skillIds);
  }

  @Delete('/delete')
  @UsePipes(new ValidationPipe())
  async deleteUserSkills(
    @Param('userId') userId: string,
    @Body() skillIds: string[],
  ) {
    return this.userSkillsService.deleteUserSkills(userId, skillIds);
  }
}
