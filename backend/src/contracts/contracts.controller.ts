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
  Patch,
  Headers,
  UnauthorizedException,
} from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { ContractStatus, Role as PrismaRole } from '@prisma/client';
import { UpdateContractDto } from './dto/update-contract.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { AuthenticatedUser, Role } from 'src/types';
@Controller('contracts')
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  @Post('/create')
  create(
    @Body() createContractDto: CreateContractDto,
    // @CurrentUser() user: AuthenticatedUser,
  ) {
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

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: AuthenticatedUser) {
    // Convert custom Role enum to Prisma Role enum
    const prismaRole =
      user.role === Role.CLIENT ? PrismaRole.CLIENT : PrismaRole.FREELANCER;
    return this.contractsService.findOneContract(id, user.id, prismaRole);
  }

  @Put(':id')
  @Roles(PrismaRole.CLIENT)
  @UsePipes(new ValidationPipe())
  update(
    @Param('id') id: string,
    @Body() updateContractDto: UpdateContractDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.contractsService.updateContract(id, user.id, updateContractDto);
  }

  @Put(':id/complete')
  @Roles(PrismaRole.CLIENT)
  complete(@Param('id') id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.contractsService.completeContract(id, user.id);
  }

  @Put(':id/cancel')
  @Roles(PrismaRole.CLIENT)
  cancel(@Param('id') id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.contractsService.cancelContract(id, user.id);
  }
}
