"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ContractType, MilestoneProps } from "@/types/contract";
import { getMilestoneStatusColor } from "@/utils/getStatusColor";
import { CheckCircle, Clock, Calendar } from "lucide-react";

interface MilestonesDisplayProps {
  milestones: MilestoneProps[];
  contractType: string;
}

export function MilestonesDisplay({
  milestones,
  contractType,
}: MilestonesDisplayProps) {
  if (contractType !== ContractType.FIXED_PRICE || milestones.length === 0)
    return null;

  const getMilestoneIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "in-progress":
        return <Clock className="w-5 h-5 text-blue-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Project Milestones</span>
          <Badge variant="outline" className="text-xs">
            {milestones.length} milestones
          </Badge>
        </CardTitle>
        <p className="text-sm text-foreground opacity-80">
          Payments will be released as you complete each milestone.
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {milestones.map((milestone, index) => (
            <div key={milestone.id} className="border rounded-lg p-4">
              <div className="flex items-start justify-between mb-3 gap-4">
                <div className="flex items-start space-x-3">
                  {getMilestoneIcon(milestone.status)}
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground mb-1">
                      Milestone {index + 1}: {milestone.title}
                    </h4>
                    <p className="text-sm text-foreground opacity-80 mb-2">
                      {milestone.description}
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>Due: {formatDate(milestone.dueDate)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-600 mb-1">
                    ${milestone.amount.toLocaleString()}
                  </div>
                  <Badge
                    className={getMilestoneStatusColor(milestone.status)}
                    variant="secondary"
                  >
                    {milestone.status.replace("-", " ")}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
