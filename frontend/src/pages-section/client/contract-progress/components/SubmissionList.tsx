import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  FileText,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDateToMonthDayYear } from "@/utils/formatDate";
import {
  WorkSubmissionProps,
  WorkSubmissionStatus,
} from "@/types/work-submissions";
import { getWorkSubmissionStatusColor } from "@/utils/getStatusColor";
import { MilestoneProps } from "@/types/contract";
import { getMilestoneAmount } from "../WorkSubmissionTab";

type SubmissionListProps = {
  submissions: WorkSubmissionProps[];
  milestones: MilestoneProps[];
  handleApprove: (submission: WorkSubmissionProps) => void;
  handleDecline: (submission: WorkSubmissionProps) => void;
  handleViewDetail: (submission: WorkSubmissionProps) => void;
};

export function SubmissionList({
  submissions,
  milestones,
  handleApprove,
  handleDecline,
  handleViewDetail,
}: SubmissionListProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="w-4 h-4" />;
      case "submitted":
        return <Clock className="w-4 h-4" />;
      case "needs_revision":
        return <AlertTriangle className="w-4 h-4" />;
      case "declined":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-4">
      {submissions.map((submission) => (
        <Card key={submission.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-2xl">{submission.title}</h3>
                  <Badge
                    className={getWorkSubmissionStatusColor(submission.status)}
                  >
                    <div className="flex items-center gap-1">
                      {getStatusIcon(submission.status)}
                      {submission.status.replace("_", " ").toUpperCase()}
                    </div>
                  </Badge>
                </div>

                <div className="flex items-center gap-4 text-sm text-foreground mb-2">
                  <span>{submission.title}</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Submitted {formatDateToMonthDayYear(submission.createdAt)}
                  </span>
                  <span className="text-foreground">
                    ${getMilestoneAmount(submission, milestones)}
                  </span>
                </div>

                <p className="text-foreground opacity-80 text-sm">
                  {submission.description}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <FileText className="w-4 h-4" />
                  <p className="text-foreground opacity-80 text-sm">
                    {submission.fileName}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-start sm:justify-end gap-2 ml-4">
                {submission.status === WorkSubmissionStatus.PENDING && (
                  <>
                    <Button
                      size="sm"
                      onClick={() => handleApprove(submission)}
                      className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Approve
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDecline(submission)}
                      className="flex items-center gap-1 text-red-600 border-red-200 hover:text-red-700"
                    >
                      <XCircle className="w-4 h-4" />
                      Decline
                    </Button>
                  </>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleViewDetail(submission)}
                  className="flex items-center gap-1 border"
                >
                  <Eye className="w-4 h-4" />
                  View Detail
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
