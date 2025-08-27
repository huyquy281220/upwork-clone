"use client";

import {
  ContractProps,
  ContractStatus,
  MilestoneStatus,
  ContractType,
} from "@/types/contract";
import { PaymentStatus } from "@/types/payments";
import { TrendingUp, DollarSign, Clock, CheckCircle } from "lucide-react";
import { useMemo } from "react";

interface ContractsHeaderProps {
  contracts: ContractProps[];
}

export function ContractsHeader({ contracts }: ContractsHeaderProps) {
  const activeContracts =
    contracts?.filter((c) => c.status === ContractStatus.ACTIVE).length ?? 0;

  const completedContracts =
    contracts?.filter((c) => c.status === ContractStatus.COMPLETED).length ?? 0;

  const totalSpent = useMemo(() => {
    if (!contracts || contracts.length === 0) return 0;
    return contracts.reduce((sum, c) => {
      if (!c.payments || c.payments.length === 0) return sum;
      const paidForContract = c.payments
        .filter(
          (p) =>
            p.status === PaymentStatus.PAID ||
            p.status === PaymentStatus.SUCCEEDED
        )
        .reduce((s, p) => s + (Number(p.amount) || 0), 0);
      return sum + paidForContract;
    }, 0);
  }, [contracts]);

  const avgProgress = useMemo(() => {
    if (!contracts || contracts.length === 0) return 0;
    const progressValues = contracts
      .map((c) => {
        const total = c.milestones?.length ?? 0;
        if (total > 0) {
          const completed = c.milestones!.filter(
            (m) => m.status === MilestoneStatus.COMPLETED
          ).length;
          return (completed / total) * 100;
        }

        // Fallbacks when no milestones
        if (c.contractType === ContractType.FIXED_PRICE) {
          return c.status === ContractStatus.COMPLETED ? 100 : 0;
        }

        if (c.contractType === ContractType.HOURLY) {
          const hourlyRate = Number(c.hourlyRate) || 0;
          const totalHours = Number(c.totalHours) || 0;
          if (
            !hourlyRate ||
            !totalHours ||
            !c.payments ||
            c.payments.length === 0
          ) {
            return null;
          }
          const paid = c.payments
            .filter(
              (p) =>
                p.status === PaymentStatus.PAID ||
                p.status === PaymentStatus.SUCCEEDED
            )
            .reduce((s, p) => s + (Number(p.amount) || 0), 0);
          const denom = hourlyRate * totalHours;
          if (!denom) return null;
          const pct = (paid / denom) * 100;
          return Math.max(0, Math.min(100, pct));
        }

        return null;
      })
      .filter((v): v is number => v !== null && !Number.isNaN(v));

    if (progressValues.length === 0) return 0;
    const sum = progressValues.reduce((s, v) => s + v, 0);
    return sum / progressValues.length;
  }, [contracts]);

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
                $
                {totalSpent.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
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
                {avgProgress.toFixed(0)}%
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>
    </div>
  );
}
