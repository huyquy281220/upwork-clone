"use client";

import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";
import { WorkLogProps } from "@/types/work-log";

interface WorkLogListProps {
  workLogs: WorkLogProps[];
}

export function WorkLogList({ workLogs }: WorkLogListProps) {
  if (!workLogs || workLogs.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500">
        <Clock className="w-8 h-8 text-gray-300 mx-auto mb-1" />
        <p className="text-sm">No work logs</p>
      </div>
    );
  }

  return (
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
                  <Badge className="bg-blue-100 text-blue-800">
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
  );
}
