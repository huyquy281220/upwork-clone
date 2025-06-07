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
  UseGuards,
} from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { ContractStatus, Role } from '@prisma/client';
import { UpdateContractDto } from './dto/update-contract.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

interface AuthenticatedUser {
  id: string;
  email: string;
  role: Role;
  clientProfile?: any;
  freelancerProfile?: any;
}

@Controller('contracts')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  @Post()
  @Roles(Role.CLIENT)
  @UsePipes(new ValidationPipe())
  create(
    @Body() createContractDto: CreateContractDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.contractsService.createContract(createContractDto, user.id);
  }

  @Get()
  findAll(
    @CurrentUser() user: AuthenticatedUser,
    @Query('skip') skip?: string,
    @Query('take') take?: string,
    @Query('jobId') jobId?: string,
    @Query('status') status?: ContractStatus,
  ) {
    // Determine clientId or freelancerId based on user role
    const clientId = user.role === Role.CLIENT ? user.id : undefined;
    const freelancerId = user.role === Role.FREELANCER ? user.id : undefined;

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
  findOne(@Param('id') id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.contractsService.findOneContract(id, user.id, user.role);
  }

  @Put(':id')
  @Roles(Role.CLIENT)
  @UsePipes(new ValidationPipe())
  update(
    @Param('id') id: string,
    @Body() updateContractDto: UpdateContractDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.contractsService.updateContract(id, user.id, updateContractDto);
  }

  @Put(':id/complete')
  @Roles(Role.CLIENT)
  complete(@Param('id') id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.contractsService.completeContract(id, user.id);
  }

  @Put(':id/cancel')
  @Roles(Role.CLIENT)
  cancel(@Param('id') id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.contractsService.cancelContract(id, user.id);
  }
}
