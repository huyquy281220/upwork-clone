import { Controller, Patch, Param, Body, Post, Get } from '@nestjs/common';
import { EducationService } from './education.service';
import { EducationItemDto } from './dto/education.dto';

@Controller('user/:userId/education')
export class EducationController {
  constructor(private readonly educationService: EducationService) {}

  @Get()
  async getUserEducation(@Param('userId') userId: string) {
    return this.educationService.getUserEducation(userId);
  }

  @Post('/create')
  async createUserEducation(
    @Param('userId') userId: string,
    @Body() createEducationDto: EducationItemDto[],
  ) {
    return this.educationService.createUserEducation(
      userId,
      createEducationDto,
    );
  }

  @Patch('/update')
  async updateUserEducation(
    @Param('userId') userId: string,
    @Body() updateEducationDto: EducationItemDto[],
  ) {
    return this.educationService.updateUserEducation(
      userId,
      updateEducationDto,
    );
  }
}
