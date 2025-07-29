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
  Req,
} from '@nestjs/common';
import { ConversationsService } from './conversation.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AuthenticatedUser } from 'src/types';

@Controller('conversations')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(
    @Body() createConversationDto: CreateConversationDto,
    @Req() req: Request & { user: AuthenticatedUser },
  ) {
    return this.conversationsService.createConversation(
      createConversationDto,
      req.user.id,
    );
  }

  @Get()
  findAll(
    @Req() req: Request & { user: AuthenticatedUser },
    @Query('limit') limit?: string,
    @Query('page') page?: string,
    @Query('jobId') jobId?: string,
  ) {
    return this.conversationsService.findAllConversations({
      limit: limit ? parseInt(limit) : undefined,
      page: page ? parseInt(page) : undefined,
      userId: req.user.id,
      jobId,
    });
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Req() req: Request & { user: AuthenticatedUser },
    @Query('page', new ParseIntPipe({ optional: true })) page: number = 1,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number = 50,
  ) {
    return this.conversationsService.findOneConversation(
      id,
      req.user.id,
      page,
      limit,
    );
  }

  @Delete(':id')
  delete(
    @Param('id') id: string,
    @Req() req: Request & { user: AuthenticatedUser },
  ) {
    return this.conversationsService.deleteConversation(id, req.user.id);
  }
}
