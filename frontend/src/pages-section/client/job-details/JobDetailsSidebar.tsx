"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, DollarSign, Calendar } from "lucide-react";

interface JobDetailsSidebarProps {
  jobData: {
    title: string;
    description: string;
    budget: { type: string; min?: number; max?: number; amount?: number };
    duration: string;
    postedDate: string;
    skills: string[];
    questions: string[];
  };
}

export function JobDetailsSidebar({ jobData }: JobDetailsSidebarProps) {
  const formatBudget = (budget: any) => {
    if (budget.type === "hourly") {
      return `$${budget.min}-$${budget.max}/hr`;
    } else {
      return `$${budget.amount?.toLocaleString()}`;
    }
  };

  return (
    <Card className="sticky top-6">
      <CardHeader>
        <CardTitle className="text-lg">Job Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">{jobData.title}</h3>
          <p className="text-sm text-gray-600 line-clamp-4">
            {jobData.description}
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-sm">
            <DollarSign className="w-4 h-4 text-gray-400" />
            <span className="font-medium">{formatBudget(jobData.budget)}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Clock className="w-4 h-4 text-gray-400" />
            <span>{jobData.duration}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span>Posted {jobData.postedDate}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 pt-4 border-t">
          {jobData.skills.map((skill, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
        </div>

        <div className="pt-4 border-t">
          <h4 className="font-medium mb-2">Questions Asked</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            {jobData.questions.map((question, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className="text-gray-400 mt-1">•</span>
                <span>{question}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
