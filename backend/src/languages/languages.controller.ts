import {
  Controller,
  Get,
  Patch,
  Param,
  Body,
  Post,
  Delete,
} from '@nestjs/common';
import { LanguagesService } from './languages.service';
import { UpdateLanguagesDto } from './dto/update-languages.dto';
import { LanguageItemDto } from './dto/create-languages.dto';

@Controller('user/:userId/languages')
export class LanguagesController {
  constructor(private readonly languagesService: LanguagesService) {}

  @Get()
  async getUserLanguages(@Param('userId') userId: string) {
    return this.languagesService.getUserLanguages(userId);
  }

  @Post('/create')
  async createUserLanguages(
    @Param('userId') userId: string,
    @Body() createLanguagesDto: LanguageItemDto[],
  ) {
    return this.languagesService.createUserLanguages(
      userId,
      createLanguagesDto,
    );
  }

  @Delete('/delete')
  async deleteUserLanguages(
    @Param('userId') userId: string,
    @Body() deleteLanguagesDto: string[],
  ) {
    return this.languagesService.deleteUserLanguages(
      userId,
      deleteLanguagesDto,
    );
  }

  @Patch('/update')
  async updateUserLanguages(
    @Param('userId') userId: string,
    @Body() updateLanguagesDto: LanguageItemDto[],
  ) {
    return this.languagesService.updateUserLanguages(
      userId,
      updateLanguagesDto,
    );
  }
}
