import { Controller, Patch, Param, Body, Post } from '@nestjs/common';
import { EducationService } from './education.service';
import {
  EducationItemDto,
  UpdateEducationDto,
} from './dto/update-education.dto';

@Controller('user/:userId/education')
export class EducationController {
  constructor(private readonly educationService: EducationService) {}

  @Post()
  async createUserEducation(
    @Param('userId') userId: string,
    @Body() createEducationDto: EducationItemDto,
  ) {
    return this.educationService.createUserEducation(userId, [
      createEducationDto,
    ]);
  }

  @Patch()
  async updateUserEducation(
    @Param('userId') userId: string,
    @Body() updateEducationDto: UpdateEducationDto,
  ) {
    return this.educationService.updateUserEducation(
      userId,
      updateEducationDto.education,
    );
  }
}
