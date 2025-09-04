"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Clock, TrendingUp } from "lucide-react";
import { ContractProps, ContractType } from "@/types/contract";
import { WorkLogList } from "./components/WorkLogList";
import { MilestoneList } from "./components/MilestoneList";

interface ProgressOverviewProps {
  contract: ContractProps;
  progress: number;
  totalPaid: number;
}

export function ProgressOverview({
  contract,
  totalPaid,
  progress,
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
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>Work Summary</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-600">
                    Total Hours Worked
                  </div>
                  <div className="text-2xl font-bold text-foreground">
                    {contract.workLog
                      ?.reduce((total, log) => {
                        const startTime = new Date(log.loggedAt);
                        const endTime = new Date(log.endTime);
                        const hours =
                          (endTime.getTime() - startTime.getTime()) /
                          (1000 * 60 * 60);
                        return total + hours;
                      }, 0)
                      .toFixed(1) || 0}{" "}
                    hrs
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">This Week</div>
                  <div className="text-lg font-semibold text-foreground">
                    {contract.workLog
                      ?.filter((log) => {
                        const logDate = new Date(log.loggedAt);
                        const weekAgo = new Date();
                        weekAgo.setDate(weekAgo.getDate() - 7);
                        return logDate >= weekAgo;
                      })
                      .reduce((total, log) => {
                        const startTime = new Date(log.loggedAt);
                        const endTime = new Date(log.endTime);
                        const hours =
                          (endTime.getTime() - startTime.getTime()) /
                          (1000 * 60 * 60);
                        return total + hours;
                      }, 0)
                      .toFixed(1) || 0}{" "}
                    hrs
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-600">Average per Week</div>
                  <div className="text-2xl font-bold text-foreground">
                    {(() => {
                      const totalHours =
                        contract.workLog?.reduce((total, log) => {
                          const startTime = new Date(log.loggedAt);
                          const endTime = new Date(log.endTime);
                          const hours =
                            (endTime.getTime() - startTime.getTime()) /
                            (1000 * 60 * 60);
                          return total + hours;
                        }, 0) || 0;
                      const weeks = contract.workLog?.length
                        ? Math.max(
                            1,
                            Math.ceil(
                              (new Date().getTime() -
                                new Date(
                                  contract.workLog[0].loggedAt
                                ).getTime()) /
                                (1000 * 60 * 60 * 24 * 7)
                            )
                          )
                        : 1;
                      return (totalHours / weeks).toFixed(1);
                    })()}{" "}
                    hrs
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Hourly Rate</div>
                  <div className="text-lg font-semibold text-foreground">
                    ${contract.hourlyRate}/hr
                  </div>
                </div>
              </div>
            </div>

            <WorkLogList workLogs={contract.workLog ?? []} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
