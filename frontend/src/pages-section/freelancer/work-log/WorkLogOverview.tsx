"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Clock, Target, CheckCircle } from "lucide-react";
import {
  ContractType,
  MilestoneProps,
  MilestoneStatus,
} from "@/types/contract";
import { WorkSubmissionProps } from "@/types/work-submissions";
import { WorkLogProps } from "@/types/work-log";
import { cn } from "@/lib/utils";

type WorkOverviewProps = {
  contractType: ContractType;
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
                  <h4 className="font-medium text-sm text-foreground mb-3">
                    Milestone Progress
                  </h4>
                  <div className="space-y-3">
                    {milestones.map((milestone) => (
                      <div
                        key={milestone.id}
                        className="flex items-center gap-3"
                      >
                        <div
                          className={cn(
                            "w-5 h-5 rounded-full flex items-center justify-center",
                            milestone.status === MilestoneStatus.COMPLETED
                              ? "bg-green-100 text-green-600"
                              : milestone.status === MilestoneStatus.IN_PROGRESS
                              ? "bg-blue-100 text-blue-600"
                              : "bg-gray-100 text-gray-400"
                          )}
                        >
                          {milestone.status === MilestoneStatus.COMPLETED ? (
                            <CheckCircle className="w-3 h-3" />
                          ) : (
                            <Clock className="w-3 h-3" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">
                              {milestone.title}
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
