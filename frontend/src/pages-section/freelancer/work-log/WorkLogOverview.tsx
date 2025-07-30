"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Clock, Target, CheckCircle } from "lucide-react";

interface WorkOverviewProps {
  contractType: "hourly" | "fixed";
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
  timeEntries: any[];
  submissions: any[];
  milestones?: any[];
}

export function WorkOverview({
  contractType,
  stats,
  timeEntries,
  submissions,
  milestones,
}: WorkOverviewProps) {
  // Calculate progress metrics
  const weeklyGoal = contractType === "hourly" ? 40 : 100; // 40 hours or 100% progress
  const currentProgress =
    contractType === "hourly"
      ? stats.thisWeekHours || 0
      : ((stats.completedMilestones || 0) / (stats.totalMilestones || 1)) * 100;

  const progressPercentage = (currentProgress / weeklyGoal) * 100;
  const isOnTrack = progressPercentage >= 75;

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
                <span className="text-sm font-medium text-gray-700">
                  {contractType === "hourly"
                    ? "Weekly Hours Goal"
                    : "Project Progress"}
                </span>
                <Badge variant={isOnTrack ? "default" : "secondary"}>
                  {isOnTrack ? "On Track" : "Behind Schedule"}
                </Badge>
              </div>

              <Progress
                value={Math.min(progressPercentage, 100)}
                className="h-3 mb-2"
              />

              <div className="flex justify-between text-sm text-gray-600">
                <span>
                  {contractType === "hourly"
                    ? `${
                        stats.thisWeekHours?.toFixed(1) || 0
                      }h of ${weeklyGoal}h this week`
                    : `${currentProgress.toFixed(0)}% complete`}
                </span>
                <span className="font-medium">
                  {Math.min(progressPercentage, 100).toFixed(0)}%
                </span>
              </div>
            </div>

            {/* Overall Progress */}
            {contractType === "fixed" &&
              milestones &&
              milestones.length > 0 && (
                <div className="pt-4 border-t">
                  <h4 className="font-medium text-sm text-gray-700 mb-3">
                    Milestone Progress
                  </h4>
                  <div className="space-y-3">
                    {milestones.map((milestone, index) => (
                      <div
                        key={milestone.id}
                        className="flex items-center gap-3"
                      >
                        <div className="flex-shrink-0">
                          {milestone.status === "completed" ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : milestone.status === "in_progress" ? (
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
                                milestone.status === "completed"
                                  ? "default"
                                  : milestone.status === "in_progress"
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
