import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProposalsService } from './proposals.service';
import { CreateProposalDto } from './dto/create-proposal';
import { UpdateProposalDto } from './dto/update-proposal.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

@Controller('proposals')
export class ProposalsController {
  constructor(private readonly proposalsService: ProposalsService) {}

  @Get('/:freelancerId/get-paginated-proposals')
  async getPaginatedProposals(
    @Param('freelancerId') freelancerId: string,
    @Query('limit', ParseIntPipe) limit: number,
    @Query('page', ParseIntPipe) page: number,
  ) {
    return this.proposalsService.getPaginatedProposals(
      freelancerId,
      limit,
      page,
    );
  }

  @Post('/create')
  @UseInterceptors(FileInterceptor('attachment'))
  async create(
    @Body() data: CreateProposalDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.proposalsService.createProposal(data, file);
  }

  @Patch('/update/:proposalId')
  @UseInterceptors(FileInterceptor('attachment'))
  async update(
    @Param('proposalId') proposalId: string,
    @Body() data: UpdateProposalDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.proposalsService.updateProposal(proposalId, data, file);
  }

  @Delete('/delete/:proposalId')
  async delete(
    @Param('proposalId') proposalId: string,
    @Query('fId') fId: string,
  ) {
    return this.proposalsService.deleteProposal(proposalId, fId);
  }
}
