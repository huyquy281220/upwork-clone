import { Controller, Get, Patch, Param, Body } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { UpdateSkillsDto } from './dto/update-skills.dto';

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
    @Body() updateSkillsDto: UpdateSkillsDto,
  ) {
    return this.skillsService.updateUserSkills(userId, updateSkillsDto.skills);
  }
}

@Controller('skills')
export class SkillsListController {
  constructor(private readonly skillsService: SkillsService) {}

  @Get()
  async getAllSkills() {
    return this.skillsService.getAllSkills();
  }
}
