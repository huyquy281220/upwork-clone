import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
  UsePipes,
  ValidationPipe,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { ConversationsService } from './conversation.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { AuthenticatedUser } from 'src/types';

@Controller('conversations')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(
    @Body() createConversationDto: CreateConversationDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.conversationsService.createConversation(
      createConversationDto,
      user.id,
    );
  }

  @Get()
  findAll(
    @CurrentUser() user: AuthenticatedUser,
    @Query('limit') limit?: string,
    @Query('page') page?: string,
    @Query('jobId') jobId?: string,
  ) {
    return this.conversationsService.findAllConversations({
      limit: limit ? parseInt(limit) : undefined,
      page: page ? parseInt(page) : undefined,
      userId: user.id,
      jobId,
    });
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @CurrentUser() user: AuthenticatedUser,
    @Query('page', new ParseIntPipe({ optional: true })) page: number = 1,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number = 50,
  ) {
    return this.conversationsService.findOneConversation(
      id,
      user.id,
      page,
      limit,
    );
  }

  @Delete(':id')
  delete(@Param('id') id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.conversationsService.deleteConversation(id, user.id);
  }
}
