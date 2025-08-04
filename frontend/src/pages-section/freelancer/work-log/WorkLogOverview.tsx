"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Clock, Target, CheckCircle } from "lucide-react";
import {
  ContractType,
  MilestoneProps,
  MilestoneStatus,
  WorkLogProps,
} from "@/types/contract";
import { WorkSubmissionProps } from "@/types/work-submissions";

type WorkOverviewProps = {
  contractType: ContractType;
  totalHours: number;
  stats: {
    totalEarning: number;
    weekEarning: number;
    progress: number;
    completedMilestones: number;
    totalMilestones: number;
    totalHoursWorked: number;
  };
  timeEntries: WorkLogProps[];
  submissions: WorkSubmissionProps[];
  milestones?: MilestoneProps[];
};

export function WorkOverview({
  contractType,
  stats,
  milestones,
}: WorkOverviewProps) {
  const isOnTrack = stats.progress >= 75;

  return (
    <div className="space-y-6">
      {/* Work Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Target className="w-5 h-5" />
            Work Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Weekly Progress */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-foreground opacity-75">
                  {contractType === ContractType.HOURLY
                    ? "Weekly Hours Goal"
                    : "Project Progress"}
                </span>
                <Badge
                  variant={isOnTrack ? "default" : "secondary"}
                  className="text-primary-foreground"
                >
                  {isOnTrack ? "On Track" : "Behind Schedule"}
                </Badge>
              </div>

              <Progress
                value={Math.min(stats.progress, 100)}
                className="h-3 mb-2"
              />

              <div className="flex justify-between text-sm text-foreground opacity-75">
                {/* <span>
                  {contractType === ContractType.HOURLY
                    ? `${
                        stats.totalHoursWorked?.toFixed(1) || 0
                      }h of ${weeklyGoal}h this week`
                    : `${currentProgress.toFixed(0)}% complete`}
                </span> */}
                <span className="font-medium">
                  {Math.min(stats.progress, 100).toFixed(0)}%
                </span>
              </div>
            </div>

            {/* Overall Progress */}
            {contractType === ContractType.FIXED_PRICE &&
              milestones &&
              milestones.length > 0 && (
                <div className="pt-4 border-t">
                  <h4 className="font-medium text-sm text-gray-700 mb-3">
                    Milestone Progress
                  </h4>
                  <div className="space-y-3">
                    {milestones.map((milestone) => (
                      <div
                        key={milestone.id}
                        className="flex items-center gap-3"
                      >
                        <div className="flex-shrink-0">
                          {milestone.status === MilestoneStatus.COMPLETED ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : milestone.status ===
                            MilestoneStatus.IN_PROGRESS ? (
                            <Clock className="w-5 h-5 text-blue-500" />
                          ) : (
                            <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">
                              {milestone.name}
                            </span>
                            <Badge
                              variant={
                                milestone.status === MilestoneStatus.COMPLETED
                                  ? "default"
                                  : milestone.status ===
                                    MilestoneStatus.IN_PROGRESS
                                  ? "secondary"
                                  : "outline"
                              }
                              className="text-xs"
                            >
                              {milestone.status.replace("_", " ")}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
