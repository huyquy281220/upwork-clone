"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  FileText,
  MessageSquare,
  CheckCircle,
  Upload,
} from "lucide-react";

// Mock activity data
const mockActivities = [
  {
    id: 1,
    type: "time_entry",
    title: "Frontend Development Work",
    description: "Worked on user authentication and dashboard components",
    duration: "4.5 hours",
    timestamp: "2024-01-15T14:30:00Z",
    status: "submitted",
  },
  {
    id: 2,
    type: "submission",
    title: "Milestone 2 Deliverable",
    description: "Completed frontend development with responsive design",
    files: ["dashboard-mockup.pdf", "component-library.zip"],
    timestamp: "2024-01-15T10:15:00Z",
    status: "pending_review",
  },
  {
    id: 3,
    type: "message",
    title: "Project Update",
    description:
      "Shared progress update and requested feedback on design direction",
    timestamp: "2024-01-14T16:45:00Z",
    status: "sent",
  },
  {
    id: 4,
    type: "time_entry",
    title: "Backend API Development",
    description:
      "Implemented user management endpoints and authentication middleware",
    duration: "6.0 hours",
    timestamp: "2024-01-14T09:00:00Z",
    status: "approved",
  },
  {
    id: 5,
    type: "submission",
    title: "Milestone 1 Deliverable",
    description: "Project setup, architecture planning, and initial wireframes",
    files: ["project-architecture.pdf", "wireframes.fig"],
    timestamp: "2024-01-12T11:30:00Z",
    status: "approved",
  },
];

export function WorkActivity() {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "time_entry":
        return <Clock className="w-4 h-4" />;
      case "submission":
        return <Upload className="w-4 h-4" />;
      case "message":
        return <MessageSquare className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "submitted":
      case "pending_review":
        return "bg-blue-100 text-blue-800";
      case "revision_requested":
        return "bg-yellow-100 text-yellow-800";
      case "sent":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffTime = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));

    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    } else if (diffHours > 0) {
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    } else {
      return "Just now";
    }
  };

  const getActivityTitle = (type: string) => {
    switch (type) {
      case "time_entry":
        return "Time Entry";
      case "submission":
        return "Work Submission";
      case "message":
        return "Message";
      default:
        return "Activity";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <CheckCircle className="w-5 h-5" />
          <span>Recent Work Activity</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockActivities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start space-x-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                  {getActivityIcon(activity.type)}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-gray-900">
                      {activity.title}
                    </h4>
                    <Badge variant="outline" className="text-xs">
                      {getActivityTitle(activity.type)}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(activity.status)}>
                      {activity.status.replace("_", " ")}
                    </Badge>
                    <span className="text-sm text-gray-500">
                      {formatTimestamp(activity.timestamp)}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mt-1">
                  {activity.description}
                </p>

                <div className="flex items-center space-x-4 mt-2">
                  {activity.duration && (
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>{activity.duration}</span>
                    </div>
                  )}

                  {activity.files && activity.files.length > 0 && (
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <FileText className="w-3 h-3" />
                      <span>
                        {activity.files.length} file
                        {activity.files.length > 1 ? "s" : ""}
                      </span>
                    </div>
                  )}
                </div>

                {activity.files && activity.files.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {activity.files.map((file, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 text-xs text-gray-700"
                      >
                        <FileText className="w-3 h-3 mr-1" />
                        {file}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
