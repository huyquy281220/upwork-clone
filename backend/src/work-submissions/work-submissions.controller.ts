import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { WorkSubmissionsService } from './work-submissions.service';

@Controller('work-submissions')
export class WorkSubmissionsController {
  constructor(private readonly service: WorkSubmissionsService) {}

  @Post()
  create(@Body() body: any) {
    return this.service.create(body);
  }

  @Get('by-contract/:contractId')
  findAllByContractId(@Param('contractId') contractId: string) {
    return this.service.findAllByContractId(contractId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.service.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
