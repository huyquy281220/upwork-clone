"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DollarSign, Calendar, CreditCard, Download, Eye } from "lucide-react";

interface Contract {
  id: number;
  budgetType: string;
  totalPaid: string;
  budget: string;
}

interface PaymentTrackingProps {
  contract: Contract;
}

// Mock payment data
const mockPayments = [
  {
    id: 1,
    type: "milestone",
    description: "Milestone 2: Frontend Development",
    amount: "$2,000",
    date: "2024-01-15",
    status: "paid",
    invoiceId: "INV-001",
    method: "Bank Transfer",
  },
  {
    id: 2,
    type: "milestone",
    description: "Milestone 1: Project Setup & Planning",
    amount: "$1,000",
    date: "2024-01-05",
    status: "paid",
    invoiceId: "INV-002",
    method: "PayPal",
  },
  {
    id: 3,
    type: "milestone",
    description: "Milestone 3: Backend Development",
    amount: "$1,500",
    date: "2024-01-25",
    status: "pending",
    invoiceId: "INV-003",
    method: "Bank Transfer",
  },
  {
    id: 4,
    type: "milestone",
    description: "Milestone 4: Testing & Deployment",
    amount: "$500",
    date: "2024-02-10",
    status: "scheduled",
    invoiceId: "INV-004",
    method: "Bank Transfer",
  },
];

const mockHourlyPayments = [
  {
    id: 1,
    type: "weekly",
    description: "Week of Jan 8-14, 2024 (32.5 hours)",
    amount: "$2,437.50",
    date: "2024-01-15",
    status: "paid",
    invoiceId: "INV-W001",
    method: "Bank Transfer",
    hours: "32.5",
  },
  {
    id: 2,
    type: "weekly",
    description: "Week of Jan 1-7, 2024 (28.0 hours)",
    amount: "$2,100.00",
    date: "2024-01-08",
    status: "paid",
    invoiceId: "INV-W002",
    method: "PayPal",
    hours: "28.0",
  },
  {
    id: 3,
    type: "weekly",
    description: "Week of Jan 15-21, 2024 (35.0 hours)",
    amount: "$2,625.00",
    date: "2024-01-22",
    status: "pending",
    invoiceId: "INV-W003",
    method: "Bank Transfer",
    hours: "35.0",
  },
];

export function PaymentTracking({ contract }: PaymentTrackingProps) {
  const isHourly = contract.budgetType === "Hourly";
  const payments = isHourly ? mockHourlyPayments : mockPayments;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const totalPaidAmount = payments
    .filter((p) => p.status === "paid")
    .reduce(
      (sum, p) =>
        sum + Number.parseFloat(p.amount.replace("$", "").replace(",", "")),
      0
    );

  const pendingAmount = payments
    .filter((p) => p.status === "pending")
    .reduce(
      (sum, p) =>
        sum + Number.parseFloat(p.amount.replace("$", "").replace(",", "")),
      0
    );

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
                ${totalPaidAmount.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Total Paid</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                ${pendingAmount.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {contract.budget}
              </div>
              <div className="text-sm text-gray-600">Total Budget</div>
            </div>
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
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {payments.map((payment) => (
              <div
                key={payment.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900">
                      {payment.description}
                    </h4>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(payment.status)}>
                        {payment.status}
                      </Badge>
                      <span className="text-lg font-semibold text-gray-900">
                        {payment.amount}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(payment.date)}</span>
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
                    <div className="flex items-center space-x-1">
                      <span>Invoice: {payment.invoiceId}</span>
                    </div>
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
