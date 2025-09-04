import { Badge } from "@/components/ui/badge";
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import { MilestoneProps, MilestoneStatus } from "@/types/contract";
import { formatDateToMonthDayYear } from "@/utils/formatDate";
import { getMilestoneStatusColor } from "@/utils/getStatusColor";
import { AlertTriangle, Calendar, CheckCircle, Clock } from "lucide-react";

interface MilestoneListProps {
  milestones: MilestoneProps[];
}

export function MilestoneList({ milestones }: MilestoneListProps) {
  const calculateDaysRemaining = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <CheckCircle className="w-5 h-5" />
          <span>Milestone Progress</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {milestones.map((milestone, index) => {
            const daysRemaining = calculateDaysRemaining(milestone.dueDate);
            const isOverdue =
              daysRemaining < 0 &&
              milestone.status !== MilestoneStatus.COMPLETED;
            const isCompleted = milestone.status === MilestoneStatus.COMPLETED;

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
                  <div className="flex items-center justify-start gap-4">
                    <h4 className="font-medium text-foreground">
                      {milestone.title}
                    </h4>
                    <div className="flex items-center space-x-2">
                      <Badge
                        className={getMilestoneStatusColor(milestone.status)}
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
  );
}
