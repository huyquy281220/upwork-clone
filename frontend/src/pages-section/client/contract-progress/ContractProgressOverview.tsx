"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  CheckCircle,
  Calendar,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";
import { ContractProps, ContractType, MilestoneStatus } from "@/types/contract";
import { getMilestoneStatusColor } from "@/utils/getStatusColor";
import { formatDateToMonthDayYear } from "@/utils/formatDate";

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

  const calculateDaysRemaining = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

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
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span>Milestone Progress</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {contract.milestones.map((milestone, index) => {
                const daysRemaining = calculateDaysRemaining(milestone.dueDate);
                const isOverdue =
                  daysRemaining < 0 &&
                  milestone.status.toLowerCase() !== MilestoneStatus.COMPLETED;
                const isCompleted =
                  milestone.status.toLowerCase() === MilestoneStatus.COMPLETED;

                return (
                  <div
                    key={milestone.id}
                    className="flex items-center space-x-4 p-4 border rounded-lg"
                  >
                    <div className="flex-shrink-0">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                          isCompleted
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {index + 1}
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-foreground">
                          {milestone.title}
                        </h4>
                        <div className="flex items-center space-x-2">
                          <Badge
                            className={getMilestoneStatusColor(
                              milestone.status
                            )}
                          >
                            {milestone.status}
                          </Badge>
                          {isOverdue && (
                            <Badge
                              variant="destructive"
                              className="flex items-center gap-1"
                            >
                              <AlertTriangle className="w-3 h-3" />
                              Overdue
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 mt-2 text-sm text-foreground opacity-80">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>
                            Due: {formatDateToMonthDayYear(milestone.dueDate)}
                          </span>
                        </div>
                        {!isCompleted && (
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span className={isOverdue ? "text-red-600" : ""}>
                              {isOverdue
                                ? `${Math.abs(daysRemaining)} days overdue`
                                : `${daysRemaining} days remaining`}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
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
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-600">
                    Total Hours Worked
                  </div>
                  <div className="text-2xl font-bold text-foreground">
                    127.5 hrs
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">This Week</div>
                  <div className="text-lg font-semibold text-foreground">
                    32.5 hrs
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-600">Average per Week</div>
                  <div className="text-2xl font-bold text-foreground">
                    28.3 hrs
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Hourly Rate</div>
                  <div className="text-lg font-semibold text-foreground">
                    $75/hr
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
