import { Controller, Post, Body, Get, Query, Req } from '@nestjs/common';
import { WorkLogService } from './worklog.service';
import { CreateWorkLogDto } from './dto/create-worklog.dto';
@Controller('work-logs')
export class WorkLogController {
  constructor(private readonly workLogService: WorkLogService) {}

  @Post()
  create(
    @Body() dto: CreateWorkLogDto,
    @Req() req: Request & { user: { id: string } },
  ) {
    return this.workLogService.create({ ...dto, freelancerId: req.user.id });
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
