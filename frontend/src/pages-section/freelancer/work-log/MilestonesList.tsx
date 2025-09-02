"use client";

import type React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Calendar, DollarSign } from "lucide-react";
import { MilestoneProps, MilestoneStatus } from "@/types/contract";
import { formatDateToMonthDayYear } from "@/utils/formatDate";

interface MilestonesListProps {
  milestones: MilestoneProps[];
}

export function MilestonesList({ milestones }: MilestonesListProps) {
  const getStatusColor = (status: MilestoneStatus) => {
    switch (status) {
      case MilestoneStatus.COMPLETED:
        return "bg-green-100 text-green-800";
      case MilestoneStatus.IN_PROGRESS:
        return "bg-blue-100 text-blue-800";
      case MilestoneStatus.SUBMITTED:
        return "bg-yellow-100 text-yellow-800";
      case MilestoneStatus.CANCELED:
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-foreground">
          Project Milestones
        </h2>
        <p className="text-sm text-foreground opacity-75">
          Track your project milestones and progress
        </p>
      </div>

      {/* Milestones List */}
      <div className="space-y-4">
        {milestones.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Target className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                No milestones yet
              </h3>
              <p className="text-gray-500">
                Milestones will appear here once they are created
              </p>
            </CardContent>
          </Card>
        ) : (
          milestones.map((milestone) => (
            <Card key={milestone.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-medium text-foreground">
                        {milestone.title}
                      </h3>
                      <Badge className={getStatusColor(milestone.status)}>
                        {milestone.status.replace("_", " ")}
                      </Badge>
                    </div>

                    <p className="text-foreground mb-3">
                      {milestone.description}
                    </p>

                    <div className="flex items-center gap-6 text-sm text-foreground">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        <span>${milestone.amount.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>
                          Due: {formatDateToMonthDayYear(milestone.dueDate)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
