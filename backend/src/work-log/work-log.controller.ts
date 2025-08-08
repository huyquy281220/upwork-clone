import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { WorkLogService } from './work-log.service';
import { CreateWorkLogDto } from './dto/create-work-log.dto';
import { User } from '@prisma/client';
import { CurrentUser } from 'src/auth/decorators/curent-user.decorator';
import { NextAuthGuard } from 'src/auth/guards/nextauth.guard';

@Controller('work-logs')
@UseGuards(NextAuthGuard)
export class WorkLogController {
  constructor(private readonly workLogService: WorkLogService) {}

  @Post()
  create(@Body() dto: CreateWorkLogDto, @CurrentUser() user: User) {
    console.log(user);
    return this.workLogService.create({ ...dto, freelancerId: user.id });
  }

  @Get('by-contract')
  getByContract(@Query('contractId') contractId: string) {
    return this.workLogService.findByContract(contractId);
  }

  @Get('my-logs')
  getByFreelancer(@Req() req: Request & { user: { id: string } }) {
    return this.workLogService.findByFreelancer(req.user.id);
  }
}
