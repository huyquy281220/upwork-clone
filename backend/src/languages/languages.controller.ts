import { Controller, Get, Patch, Param, Body } from '@nestjs/common';
import { LanguagesService } from './languages.service';
import { UpdateLanguagesDto } from './dto/update-languages.dto';

@Controller('user/:userId/languages')
export class LanguagesController {
  constructor(private readonly languagesService: LanguagesService) {}

  @Get()
  async getUserLanguages(@Param('userId') userId: string) {
    return this.languagesService.getUserLanguages(userId);
  }

  @Patch()
  async updateUserLanguages(
    @Param('userId') userId: string,
    @Body() updateLanguagesDto: UpdateLanguagesDto,
  ) {
    return this.languagesService.updateUserLanguages(
      userId,
      updateLanguagesDto.languages,
    );
  }
}
