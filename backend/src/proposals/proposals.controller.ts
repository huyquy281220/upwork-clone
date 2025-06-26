import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ProposalsService } from './proposals.service';
import { CreateProposalDto } from './dto/create-proposal';
import { UpdateProposalDto } from './dto/update-proposal.dto';

@Controller('proposals')
export class ProposalsController {
  constructor(private readonly proposalsService: ProposalsService) {}

  @Post('/create')
  async create(@Body() data: CreateProposalDto) {
    return this.proposalsService.createProposal(data);
  }

  @Patch('/update/:proposalId')
  async update(
    @Param('proposalId') proposalId: string,
    @Body() data: UpdateProposalDto,
  ) {
    return this.proposalsService.updateProposal(proposalId, data);
  }

  @Delete('/delete/:proposalId')
  async delete(
    @Param('proposalId') proposalId: string,
    @Query('fId') fId: string,
  ) {
    return this.proposalsService.deleteProposal(proposalId, fId);
  }
}
