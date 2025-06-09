import { Controller, Patch, Param, Body } from '@nestjs/common';
import { EducationService } from './education.service';
import { UpdateEducationDto } from './dto/update-education.dto';

@Controller('user/:userId/education')
export class EducationController {
  constructor(private readonly educationService: EducationService) {}

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
