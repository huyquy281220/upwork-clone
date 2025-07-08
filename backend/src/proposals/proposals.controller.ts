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
    @Query('searchQuery') searchQuery?: string,
    @Query('status') statusFilter?: string,
    @Query('date') dateFilter?: string,
    @Query('budget') budgetFilter?: string,
    @Query('sortBy') sortBy = 'newest',
  ) {
    return this.proposalsService.getPaginatedProposals(
      freelancerId,
      limit,
      page,
      searchQuery,
      statusFilter,
      dateFilter,
      budgetFilter,
      sortBy,
    );
  }

  @Get('/:jobId/get-paginated-proposals-by-job')
  async getPaginatedProposalsByJob(
    @Param('jobId') jobId: string,
    @Query('limit', ParseIntPipe) limit: number,
    @Query('page', ParseIntPipe) page: number,
    @Query('searchQuery') searchQuery?: string,
    @Query('sortBy') sortBy = 'newest',
  ) {
    return this.proposalsService.getPaginatedProposalsByJob(
      jobId,
      limit,
      page,
      searchQuery,
      sortBy,
    );
  }

  @Get('/:proposalId')
  async getOneProposal(@Param('proposalId') proposalId: string) {
    return this.proposalsService.findOneProposal(proposalId);
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

  @Patch('/reject/:proposalId')
  async rejectProposal(
    @Param('proposalId') proposalId: string,
    @Query('clientId') clientId: string,
  ) {
    return this.proposalsService.rejectProposal(proposalId, clientId);
  }
}
