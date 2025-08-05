import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UploadedFile,
} from '@nestjs/common';
import { WorkSubmissionsService } from './work-submissions.service';
import { CreateWorkSubmissionDto } from './dto/create-work-submissions.dto';
import { Express } from 'express';
import { UpdateWorkSubmissionDto } from './dto/update-work-submissions.dto';

@Controller('work-submissions')
export class WorkSubmissionsController {
  constructor(private readonly service: WorkSubmissionsService) {}

  @Post('create')
  create(
    @Body() body: CreateWorkSubmissionDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.service.create(body, file);
  }

  @Get('by-contract/:contractId')
  findAllByContractId(@Param('contractId') contractId: string) {
    return this.service.findAllByContractId(contractId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch('update/:id')
  update(
    @Param('id') id: string,
    @Body() body: UpdateWorkSubmissionDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.service.update(id, body, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
