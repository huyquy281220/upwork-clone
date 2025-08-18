import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('/create')
  async createPayment(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.createPayment(createPaymentDto);
  }

  @Patch('/update/:paymentId')
  async updatePayment(@Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentsService.updatePayment(updatePaymentDto);
  }

  @Delete('/delete/:paymentId')
  async deletePayment(@Param('paymentId') paymentId: string) {
    return this.paymentsService.deletePayment(paymentId);
  }
}
