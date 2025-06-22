import { Controller, Get, Patch, Param, Body } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { SkillItemDto } from './dto/skills.dto';

@Controller('user/:userId/skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Get()
  async getUserSkills(@Param('userId') userId: string) {
    return this.skillsService.getUserSkills(userId);
  }

  @Patch()
  async updateUserSkills(
    @Param('userId') userId: string,
    @Body() updateSkillsDto: SkillItemDto[],
  ) {
    return this.skillsService.updateUserSkills(userId, updateSkillsDto);
  }
}

@Controller('skills')
export class SkillsListController {
  constructor(private readonly skillsService: SkillsService) {}

  @Get()
  async getAllSkills() {
    return this.skillsService.getAllSkills();
  }

  @Get('/job/:jobId')
  async getSkillsByJobId(@Param('jobId') jobId: string) {
    return this.skillsService.getSkillsByJobId(jobId);
  }
}
