import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UsePipes,
  ValidationPipe,
  Patch,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { ContractStatus } from '@prisma/client';
import { UpdateContractDto } from './dto/update-contract.dto';
import { AuthenticatedUser } from 'src/types';
import { NextAuthGuard } from 'src/auth/guards/nextauth.guard';

@Controller('contracts')
@UseGuards(NextAuthGuard)
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  @Post('/create')
  create(@Body() createContractDto: CreateContractDto) {
    return this.contractsService.createContract(createContractDto);
  }

  @Get('freelancer')
  findAllForFreelancer(
    @Query('freelancerId') freelancerId?: string,
    @Query('limit') limit?: string,
    @Query('page') page?: string,
    @Query('status') status?: ContractStatus,
    @Query('searchQuery') searchQuery?: string,
    @Query('type') type?: string,
    @Query('date') date?: string,
    @Query('sortedBy') sortedBy?: string,
  ) {
    return this.contractsService.findAllContractsForFreelancer(
      limit ? parseInt(limit) : undefined,
      page ? parseInt(page) : undefined,
      freelancerId,
      status,
      searchQuery,
      type,
      date,
      sortedBy,
    );
  }

  @Get('client')
  findAll(
    @Query('clientId') clientId?: string,
    @Query('limit') limit?: string,
    @Query('page') page?: string,
    @Query('jobId') jobId?: string,
    @Query('searchQuery') searchQuery?: string,
    @Query('type') type?: string,
    @Query('date') date?: string,
    @Query('status') status?: ContractStatus,
  ) {
    return this.contractsService.findAllContractsForClient(
      limit ? parseInt(limit) : undefined,
      page ? parseInt(page) : undefined,
      clientId,
      status,
      searchQuery,
      type,
      date,
    );
  }

  @Get(':contractId')
  findOne(@Param('contractId') contractId: string) {
    return this.contractsService.findOneContract(contractId);
  }

  @Patch('/update/:contractId')
  @UsePipes(new ValidationPipe())
  update(
    @Param('contractId') contractId: string,
    @Body() updateContractDto: UpdateContractDto,
    @Req() req: Request & { user: AuthenticatedUser },
  ) {
    return this.contractsService.updateContract(
      contractId,
      req.user.id,
      updateContractDto,
    );
  }

  @Patch('/complete/:contractId')
  complete(
    @Param('contractId') contractId: string,
    @Req() req: Request & { user: { id: string } },
  ) {
    return this.contractsService.completeContract(contractId, req.user.id);
  }

  @Patch('/cancel/:contractId')
  cancel(
    @Param('contractId') contractId: string,
    @Req() req: Request & { user: AuthenticatedUser },
  ) {
    return this.contractsService.cancelContract(contractId, req.user.id);
  }
}
