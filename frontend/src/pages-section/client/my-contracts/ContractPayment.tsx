"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Calendar,
  DollarSign,
  Download,
  CreditCard,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

interface Contract {
  id: number;
  title: string;
  freelancer: {
    name: string;
    avatar: string;
    rating: number;
    location: string;
    verified: boolean;
  };
  status: string;
  startDate: string;
  budget: string;
  budgetType: string;
  hourlyRate: string | null;
  totalPaid: string;
  progress: number;
  category: string;
  description: string;
  milestones: Array<{
    id: number;
    title: string;
    amount: string;
    status: string;
    dueDate: string;
  }>;
}

interface ContractPaymentsProps {
  contract: Contract;
}

// Mock payment data
const mockPayments = [
  {
    id: 1,
    type: "milestone",
    description: "Project Setup & Planning",
    amount: "$1,000.00",
    date: "2024-01-25",
    status: "completed",
    method: "Credit Card",
    transactionId: "TXN-001-2024",
  },
  {
    id: 2,
    type: "milestone",
    description: "Frontend Development",
    amount: "$2,000.00",
    date: "2024-02-10",
    status: "completed",
    method: "Credit Card",
    transactionId: "TXN-002-2024",
  },
  {
    id: 3,
    type: "milestone",
    description: "Backend Development",
    amount: "$1,500.00",
    date: "2024-02-25",
    status: "pending",
    method: "Credit Card",
    transactionId: null,
  },
];

const mockHourlyPayments = [
  {
    id: 1,
    type: "hourly",
    description: "Week ending Feb 4, 2024 - 8 hours",
    amount: "$600.00",
    date: "2024-02-05",
    status: "completed",
    method: "Credit Card",
    transactionId: "TXN-H001-2024",
  },
  {
    id: 2,
    type: "hourly",
    description: "Week ending Feb 11, 2024 - 10 hours",
    amount: "$750.00",
    date: "2024-02-12",
    status: "completed",
    method: "Credit Card",
    transactionId: "TXN-H002-2024",
  },
  {
    id: 3,
    type: "hourly",
    description: "Week ending Feb 18, 2024 - 12 hours",
    amount: "$900.00",
    date: "2024-02-19",
    status: "pending",
    method: "Credit Card",
    transactionId: null,
  },
];

export function ContractPayments({ contract }: ContractPaymentsProps) {
  const isHourlyContract = contract.budgetType === "Hourly";
  const payments = isHourlyContract ? mockHourlyPayments : mockPayments;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "failed":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const totalPaid = payments
    .filter((p) => p.status === "completed")
    .reduce(
      (sum, payment) =>
        sum + Number.parseFloat(payment.amount.replace(/[$,]/g, "")),
      0
    );

  const pendingAmount = payments
    .filter((p) => p.status === "pending")
    .reduce(
      (sum, payment) =>
        sum + Number.parseFloat(payment.amount.replace(/[$,]/g, "")),
      0
    );

  return (
    <div className="space-y-6">
      {/* Payment Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-600">
                ${totalPaid.toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">Total Paid</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <Clock className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-yellow-600">
                ${pendingAmount.toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">Pending</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <CreditCard className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-blue-600">
                {payments.length}
              </p>
              <p className="text-sm text-gray-600">Total Transactions</p>
            </div>
          </div>

          {!isHourlyContract && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Budget Progress
                </span>
                <span className="text-sm text-gray-600">
                  ${totalPaid.toLocaleString()} / {contract.budget}
                </span>
              </div>
              <Progress
                value={
                  (totalPaid /
                    Number.parseFloat(contract.budget.replace(/[$,]/g, ""))) *
                  100
                }
                className="h-3"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Payment History</CardTitle>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {payments.map((payment) => (
              <div key={payment.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="flex-shrink-0 mt-1">
                      {getStatusIcon(payment.status)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-gray-900">
                          {payment.description}
                        </h3>
                        <Badge className={getStatusColor(payment.status)}>
                          {payment.status.charAt(0).toUpperCase() +
                            payment.status.slice(1)}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                        <div>
                          <div className="flex items-center space-x-1 text-sm text-gray-600 mb-1">
                            <DollarSign className="w-4 h-4" />
                            <span>Amount</span>
                          </div>
                          <p className="text-sm font-medium text-gray-900">
                            {payment.amount}
                          </p>
                        </div>

                        <div>
                          <div className="flex items-center space-x-1 text-sm text-gray-600 mb-1">
                            <Calendar className="w-4 h-4" />
                            <span>Date</span>
                          </div>
                          <p className="text-sm font-medium text-gray-900">
                            {formatDate(payment.date)}
                          </p>
                        </div>

                        <div>
                          <div className="flex items-center space-x-1 text-sm text-gray-600 mb-1">
                            <CreditCard className="w-4 h-4" />
                            <span>Method</span>
                          </div>
                          <p className="text-sm font-medium text-gray-900">
                            {payment.method}
                          </p>
                        </div>

                        <div>
                          <div className="flex items-center space-x-1 text-sm text-gray-600 mb-1">
                            <span>Transaction ID</span>
                          </div>
                          <p className="text-sm font-medium text-gray-900">
                            {payment.transactionId || "Pending"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    {payment.status === "completed" && (
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Receipt
                      </Button>
                    )}
                    {payment.status === "pending" && (
                      <Button size="sm">Process Payment</Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Methods</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                <CreditCard className="w-8 h-8 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900">
                    •••• •••• •••• 4242
                  </p>
                  <p className="text-sm text-gray-600">Expires 12/25</p>
                </div>
              </div>
              <Badge variant="secondary">Primary</Badge>
            </div>
            <Button variant="outline" className="w-full bg-transparent">
              Add Payment Method
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
