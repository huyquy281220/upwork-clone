"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DollarSign, Calendar, CreditCard, Download, Eye } from "lucide-react";
// import { formatDateToMonthDayYear } from "@/utils/formatDate";
import { getPaymentStatusColor } from "@/utils/getStatusColor";
import { ContractProps, ContractType } from "@/types/contract";
import { PaymentStatus } from "@/types/payments";

interface PaymentTrackingProps {
  contract: ContractProps;
  totalPaid: number;
}

export function PaymentTracking({ contract, totalPaid }: PaymentTrackingProps) {
  const payments = contract.payments ?? [];

  const pendingAmount = payments
    .filter((p) => p.status === PaymentStatus.PENDING)
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      {/* Payment Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="w-5 h-5" />
            <span>Payment Summary</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                ${totalPaid}
              </div>
              <div className="text-sm text-foreground">Total Paid</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                ${pendingAmount}
              </div>
              <div className="text-sm text-foreground">Pending</div>
            </div>
            {contract.contractType === ContractType.FIXED_PRICE && (
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">
                  {contract.totalPrice}
                </div>
                <div className="text-sm text-foreground">Total Budget</div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CreditCard className="w-5 h-5" />
              <span>Payment History</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {payments.map((payment) => (
              <div
                key={payment.id}
                className="flex items-center justify-between p-4 border rounded-lg transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    {/* <h4 className="font-medium text-gray-900">
                      {payment.description}
                    </h4> */}
                    <div className="flex items-center space-x-2">
                      <Badge className={getPaymentStatusColor(payment.status)}>
                        {payment.status}
                      </Badge>
                      <span className="text-lg font-semibold text-foreground">
                        {payment.amount}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      {/* <span>{formatDateToMonthDayYear(payment.date)}</span> */}
                    </div>
                    <div className="flex items-center space-x-1">
                      <CreditCard className="w-4 h-4" />
                      <span>{payment.method}</span>
                    </div>
                    {/* {payment.hours && (
                      <div className="flex items-center space-x-1">
                        <span>{payment.hours} hours</span>
                      </div>
                    )} */}
                    {/* <div className="flex items-center space-x-1">
                      <span>Invoice: {payment.invoiceId}</span>
                    </div> */}
                  </div>
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
