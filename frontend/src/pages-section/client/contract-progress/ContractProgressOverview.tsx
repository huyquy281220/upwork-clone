"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, Calendar, TrendingUp } from "lucide-react";

interface Contract {
  id: number;
  title: string;
  budgetType: string;
  progress: number;
  totalPaid: string;
  budget: string;
  startDate: string;
  milestones?: Array<{
    id: number;
    title: string;
    status: string;
    dueDate: string;
    amount: string;
  }>;
}

interface ProgressOverviewProps {
  contract: Contract;
}

export function ProgressOverview({ contract }: ProgressOverviewProps) {
  const isHourly = contract.budgetType === "Hourly";

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "text-green-600";
    if (progress >= 50) return "text-blue-600";
    if (progress >= 25) return "text-yellow-600";
    return "text-red-600";
  };

  const getMilestoneStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in progress":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-gray-100 text-gray-800";
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
              <span className="text-sm font-medium text-gray-700">
                {isHourly ? "Work Completion" : "Project Progress"}
              </span>
              <span
                className={`text-sm font-semibold ${getProgressColor(
                  contract.progress
                )}`}
              >
                {contract.progress}%
              </span>
            </div>
            <Progress value={contract.progress} className="h-3" />

            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {contract.progress}%
                </div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {contract.totalPaid}
                </div>
                <div className="text-sm text-gray-600">Total Paid</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {Math.ceil(
                    (new Date().getTime() -
                      new Date(contract.startDate).getTime()) /
                      (1000 * 60 * 60 * 24)
                  )}
                </div>
                <div className="text-sm text-gray-600">Days Active</div>
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
                const isOverdue = daysRemaining < 0;
                const isCompleted =
                  milestone.status.toLowerCase() === "completed";

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
                        <h4 className="font-medium text-gray-900">
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
                          <span className="text-sm font-medium text-gray-900">
                            {milestone.amount}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>Due: {formatDate(milestone.dueDate)}</span>
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
                  <div className="text-2xl font-bold text-gray-900">
                    127.5 hrs
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">This Week</div>
                  <div className="text-lg font-semibold text-gray-900">
                    32.5 hrs
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-600">Average per Week</div>
                  <div className="text-2xl font-bold text-gray-900">
                    28.3 hrs
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Hourly Rate</div>
                  <div className="text-lg font-semibold text-gray-900">
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
