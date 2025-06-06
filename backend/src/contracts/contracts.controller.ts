import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { ContractStatus } from '@prisma/client';
import { UpdateContractDto } from './dto/update-contract.dto';

@Controller('contracts')
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createContractDto: CreateContractDto) {
    return this.contractsService.createContract(createContractDto);
  }

  @Get()
  findAll(
    @Query('skip') skip: string,
    @Query('take') take: string,
    @Query('clientId') clientId?: string,
    @Query('freelancerId') freelancerId?: string,
    @Query('jobId') jobId?: string,
    @Query('status') status?: ContractStatus,
  ) {
    return this.contractsService.findAllContracts({
      skip: skip ? parseInt(skip) : undefined,
      take: take ? parseInt(take) : undefined,
      clientId,
      freelancerId,
      jobId,
      status,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contractsService.findOneContract(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  update(
    @Param('id') id: string,
    @Query('clientId') clientId: string,
    @Body() updateContractDto: UpdateContractDto,
  ) {
    return this.contractsService.updateContract(
      id,
      clientId,
      updateContractDto,
    );
  }

  @Put(':id/complete')
  complete(@Param('id') id: string, @Query('clientId') clientId: string) {
    return this.contractsService.completeContract(id, clientId);
  }

  @Put(':id/cancel')
  cancel(@Param('id') id: string, @Query('clientId') clientId: string) {
    return this.contractsService.cancelContract(id, clientId);
  }
}
