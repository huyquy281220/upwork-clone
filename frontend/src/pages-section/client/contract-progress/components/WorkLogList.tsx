"use client";

import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";
import { WorkLogProps } from "@/types/work-log";
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";

interface WorkLogListProps {
  workLogs: WorkLogProps[];
  hourlyRate: number;
  hoursWorked: number;
}

export function WorkLogList({
  workLogs,
  hourlyRate,
  hoursWorked,
}: WorkLogListProps) {
  if (!workLogs || workLogs.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500">
        <Clock className="w-8 h-8 text-gray-300 mx-auto mb-1" />
        <p className="text-sm">No work logs</p>
      </div>
    );
  }

  return (
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
              <div className="text-sm text-foreground">Total Hours Worked</div>
              <div className="text-2xl font-bold text-foreground">
                {hoursWorked} hrs
              </div>
            </div>
            <div>
              <div className="text-sm text-foreground">This Week</div>
              <div className="text-lg font-semibold text-foreground">
                {workLogs
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
              <div className="text-sm text-foreground">Average per Week</div>
              <div className="text-2xl font-bold text-foreground">
                {(() => {
                  const totalHours =
                    workLogs?.reduce((total, log) => {
                      const startTime = new Date(log.loggedAt);
                      const endTime = new Date(log.endTime);
                      const hours =
                        (endTime.getTime() - startTime.getTime()) /
                        (1000 * 60 * 60);
                      return total + hours;
                    }, 0) || 0;
                  const weeks = workLogs?.length
                    ? Math.max(
                        1,
                        Math.ceil(
                          (new Date().getTime() -
                            new Date(workLogs[0].loggedAt).getTime()) /
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
              <div className="text-sm text-foreground">Hourly Rate</div>
              <div className="text-lg font-semibold text-foreground">
                ${hourlyRate}/hr
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-medium text-foreground">Work Log Entries</h4>
          <div className="max-h-60 overflow-y-auto space-y-2">
            {workLogs.map((log, index) => {
              const startTime = new Date(log.loggedAt);
              const endTime = new Date(log.endTime);
              const hours =
                (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);

              return (
                <div
                  key={log.id}
                  className="flex items-center space-x-4 p-4 border rounded-lg"
                >
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-start gap-4">
                      <h4 className="font-medium text-foreground">
                        {log.description}
                      </h4>
                      <Badge className="bg-blue-100 text-green-800">
                        {hours.toFixed(1)}h
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-foreground opacity-80">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {startTime.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}{" "}
                          -{" "}
                          {endTime.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{startTime.toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
