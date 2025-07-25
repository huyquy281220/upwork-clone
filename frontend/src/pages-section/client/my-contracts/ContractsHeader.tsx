"use client";

import { TrendingUp, DollarSign, Clock, CheckCircle } from "lucide-react";

interface Contract {
  id: number;
  status: string;
  budgetType: string;
  totalPaid: string;
  progress: number;
}

interface ContractsHeaderProps {
  contracts: Contract[];
}

export function ContractsHeader({ contracts }: ContractsHeaderProps) {
  const activeContracts = contracts.filter((c) => c.status === "Active").length;
  const completedContracts = contracts.filter(
    (c) => c.status === "Completed"
  ).length;
  const totalSpent = contracts.reduce((sum, contract) => {
    const amount = Number.parseFloat(contract.totalPaid.replace(/[$,]/g, ""));
    return sum + amount;
  }, 0);
  const avgProgress =
    contracts.length > 0
      ? Math.round(
          contracts.reduce((sum, contract) => sum + contract.progress, 0) /
            contracts.length
        )
      : 0;

  return (
    <div className="bg-card rounded-lg shadow-sm border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Contracts</h1>
          <p className="text-card-foreground mt-1">
            Manage and track your active contracts
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">
                Active Contracts
              </p>
              <p className="text-2xl font-bold text-blue-900">
                {activeContracts}
              </p>
            </div>
            <Clock className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Completed</p>
              <p className="text-2xl font-bold text-green-900">
                {completedContracts}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600">Total Spent</p>
              <p className="text-2xl font-bold text-purple-900">
                ${totalSpent.toLocaleString()}
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-orange-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-600">
                Avg Progress
              </p>
              <p className="text-2xl font-bold text-orange-900">
                {avgProgress}%
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>
    </div>
  );
}
