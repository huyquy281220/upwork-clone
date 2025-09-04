"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp } from "lucide-react";
import { ContractProps, ContractType } from "@/types/contract";
import { WorkLogList } from "./components/WorkLogList";
import { MilestoneList } from "./components/MilestoneList";

interface ProgressOverviewProps {
  contract: ContractProps;
  progress: number;
  totalPaid: number;
  hoursWorked: number;
}

export function ProgressOverview({
  contract,
  totalPaid,
  progress,
  hoursWorked,
}: ProgressOverviewProps) {
  const isHourly = contract.contractType === ContractType.HOURLY;

  return (
    <div className="space-y-6">
      {/* Overall Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5" />
            <span>Overall Progress</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">
                {isHourly ? "Work Completion" : "Project Progress"}
              </span>
              <span className="text-sm font-semibold text-green-600">
                {progress}%
              </span>
            </div>
            <Progress value={progress} className="h-3" />

            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {progress}%
                </div>
                <div className="text-sm text-foreground">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {totalPaid}
                </div>
                <div className="text-sm text-foreground">Total Paid</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {Math.ceil(
                    (new Date().getTime() -
                      new Date(contract.startedAt).getTime()) /
                      (1000 * 60 * 60 * 24)
                  )}
                </div>
                <div className="text-sm text-foreground">Days Active</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Milestones Progress (Fixed Price Only) */}
      {!isHourly && contract.milestones && contract.milestones.length > 0 && (
        <MilestoneList milestones={contract.milestones ?? []} />
      )}

      {/* Work Summary for Hourly Contracts */}
      {isHourly && (
        <WorkLogList
          workLogs={contract.workLog ?? []}
          hourlyRate={contract.hourlyRate ?? 0}
          hoursWorked={hoursWorked}
        />
      )}
    </div>
  );
}
