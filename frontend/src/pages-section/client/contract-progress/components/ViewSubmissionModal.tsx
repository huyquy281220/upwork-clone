"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Download,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
} from "lucide-react";
import { WorkSubmissionProps } from "@/types/work-submissions";
import { formatDateToMonthDayYear } from "@/utils/formatDate";
import { getWorkSubmissionStatusColor } from "@/utils/getStatusColor";

interface ViewSubmissionModalProps {
  submission: WorkSubmissionProps;
  isOpen: boolean;
  onClose: () => void;
}

export function ViewSubmissionModal({
  submission,
  isOpen,
  onClose,
}: ViewSubmissionModalProps) {
  if (!submission) return null;

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

  const getFileType = (fileName: string) => {
    return fileName.split(".").pop()?.toUpperCase() || "FILE";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            {submission.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4 p-4 bg-subBackground rounded-lg">
            <div>
              <span className="text-sm text-foreground">Status:</span>
              <div className="flex items-center gap-2 mt-1">
                <Badge
                  className={getWorkSubmissionStatusColor(submission.status)}
                >
                  <div className="flex items-center gap-1">
                    {getStatusIcon(submission.status)}
                    {submission.status.replace("_", " ").toUpperCase()}
                  </div>
                </Badge>
              </div>
            </div>
            <div>
              <span className="text-sm text-foreground">Submitted:</span>
              <div className="font-medium mt-1">
                {formatDateToMonthDayYear(submission.createdAt)}
              </div>
            </div>
            <div>
              <span className="text-sm text-foreground">Last Updated:</span>
              <div className="font-medium mt-1">
                {formatDateToMonthDayYear(submission.updatedAt)}
              </div>
            </div>
            {submission.reviewedAt && (
              <div>
                <span className="text-sm text-foreground">Reviewed:</span>
                <div className="font-medium mt-1">
                  {formatDateToMonthDayYear(submission.reviewedAt)}
                </div>
              </div>
            )}
          </div>

          <div>
            <h4 className="font-medium mb-2">Description</h4>
            <p className="text-foreground opacity-80">
              {submission.description}
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-3">Submitted File</h4>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="w-8 h-8 text-foreground opacity-80" />
                <div>
                  <div className="font-medium">{submission.fileName}</div>
                  <div className="text-sm text-foreground opacity-80">
                    {getFileType(submission.fileName)} • {submission.fileSize}
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1 bg-transparent"
                onClick={() => window.open(submission.fileUrl, "_blank")}
              >
                <Download className="w-4 h-4" />
                Download
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
