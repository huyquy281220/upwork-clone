"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Clock, DollarSign, Target, TrendingUp } from "lucide-react";
import { ContractType } from "@/types/contract";
interface WorkLogStatsProps {
  contractType: ContractType;
  stats: {
    totalHoursWorked?: number;
    totalEarnings: number;
    thisWeekHours?: number;
    thisWeekEarnings: number;
    averageHoursPerDay?: number;
    hourlyRate?: number;
    completedMilestones?: number;
    totalMilestones?: number;
  };
}

export function WorkLogStats({ contractType, stats }: WorkLogStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total Work */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground opacity-80">
                {contractType === ContractType.HOURLY
                  ? "Total Hours"
                  : "Progress"}
              </p>
              <p className="text-2xl font-bold text-foreground">
                {contractType === ContractType.HOURLY
                  ? `${stats.totalHoursWorked?.toFixed(1) || 0}h`
                  : `${(
                      ((stats.completedMilestones || 0) /
                        (stats.totalMilestones || 1)) *
                      100
                    ).toFixed(0)}%`}
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              {contractType === ContractType.HOURLY ? (
                <Clock className="w-6 h-6 text-green-600" />
              ) : (
                <Target className="w-6 h-6 text-green-600" />
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Total Earnings */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground opacity-80">
                Total Earnings
              </p>
              <p className="text-2xl font-bold text-foreground">
                ${stats.totalEarnings.toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* This Week */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground opacity-80">
                This Week
              </p>
              <p className="text-2xl font-bold text-foreground">
                {contractType === ContractType.HOURLY
                  ? `${stats.thisWeekHours?.toFixed(1) || 0}h`
                  : `$${stats.thisWeekEarnings.toLocaleString()}`}
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              {contractType === ContractType.HOURLY ? (
                <Clock className="w-6 h-6 text-purple-600" />
              ) : (
                <DollarSign className="w-6 h-6 text-purple-600" />
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Metric */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground opacity-80">
                {contractType === ContractType.HOURLY
                  ? "Daily Average"
                  : "Milestones"}
              </p>
              <p className="text-2xl font-bold text-foreground">
                {contractType === ContractType.HOURLY
                  ? `${stats.averageHoursPerDay?.toFixed(1) || 0}h`
                  : `${stats.completedMilestones || 0}/${
                      stats.totalMilestones || 0
                    }`}
              </p>
            </div>
            <div className="p-3 bg-orange-100 rounded-full">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
