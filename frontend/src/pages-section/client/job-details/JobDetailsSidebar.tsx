"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { JobProps, JobType } from "@/types/jobs";
import { formatRelativeTime } from "@/utils/getRelativeTime";
import { Clock, DollarSign, Calendar } from "lucide-react";

interface JobDetailsSidebarProps {
  jobData: JobProps;
}

export function JobDetailsSidebar({ jobData }: JobDetailsSidebarProps) {
  const formatBudget = (jobType: JobType) => {
    if (jobType === JobType.HOURLY) {
      return `$${jobData.hourlyRateMin}-$${jobData.hourlyRateMax}/hr`;
    } else {
      return `$${jobData.fixedPrice}`;
    }
  };

  return (
    <Card className="sticky top-6">
      <CardHeader>
        <CardTitle className="text-lg">Job Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold text-foreground mb-2">
            {jobData.title}
          </h3>
          <p className="text-sm text-gray-400 line-clamp-3">
            {jobData.description}
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-sm">
            <DollarSign className="w-4 h-4 text-gray-400" />
            <span className="font-medium">{formatBudget(jobData.jobType)}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Clock className="w-4 h-4 text-gray-400" />
            <span>{jobData.jobDuration}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span>Posted {formatRelativeTime(jobData.createdAt)}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 pt-4 border-t">
          {jobData.skills.map(({ id, name }) => (
            <Badge
              key={id}
              variant="secondary"
              className="bg-background text-foreground flex items-center gap-1 py-1.5 border border-gray-700"
            >
              {name}
            </Badge>
          ))}
        </div>

        {/* <div className="pt-4 border-t">
          <h4 className="font-medium mb-2">Questions Asked</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            {jobData.questions.map((question, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className="text-gray-400 mt-1">•</span>
                <span>{question}</span>
              </li>
            ))}
          </ul>
        </div> */}
      </CardContent>
    </Card>
  );
}
