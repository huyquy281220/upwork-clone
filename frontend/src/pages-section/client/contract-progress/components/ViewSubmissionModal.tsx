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
import {
  WorkSubmissionProps,
  WorkSubmissionStatus,
} from "@/types/work-submissions";
import { formatDateToMonthDayYear } from "@/utils/formatDate";

interface SubmissionDetailModalProps {
  submission: WorkSubmissionProps | null;
  isOpen: boolean;
  onClose: () => void;
  onApprove?: (submission: WorkSubmissionProps) => void;
  onDecline?: (submission: WorkSubmissionProps) => void;
}

export function SubmissionDetailModal({
  submission,
  isOpen,
  onClose,
  onApprove,
  onDecline,
}: SubmissionDetailModalProps) {
  if (!submission) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "submitted":
        return "bg-blue-100 text-blue-800";
      case "needs_revision":
        return "bg-yellow-100 text-yellow-800";
      case "declined":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

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
          <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <span className="text-sm text-gray-600">Status:</span>
              <div className="flex items-center gap-2 mt-1">
                <Badge className={getStatusColor(submission.status)}>
                  <div className="flex items-center gap-1">
                    {getStatusIcon(submission.status)}
                    {submission.status.replace("_", " ").toUpperCase()}
                  </div>
                </Badge>
              </div>
            </div>
            <div>
              <span className="text-sm text-gray-600">Submitted:</span>
              <div className="font-medium mt-1">
                {formatDateToMonthDayYear(submission.createdAt)}
              </div>
            </div>
            <div>
              <span className="text-sm text-gray-600">Last Updated:</span>
              <div className="font-medium mt-1">
                {formatDateToMonthDayYear(submission.updatedAt)}
              </div>
            </div>
            {submission.reviewedAt && (
              <div>
                <span className="text-sm text-gray-600">Reviewed:</span>
                <div className="font-medium mt-1">
                  {formatDateToMonthDayYear(submission.reviewedAt)}
                </div>
              </div>
            )}
          </div>

          <div>
            <h4 className="font-medium mb-2">Description</h4>
            <p className="text-gray-700">{submission.description}</p>
          </div>

          <div>
            <h4 className="font-medium mb-3">Submitted File</h4>
            <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
              <div className="flex items-center gap-3">
                <FileText className="w-8 h-8 text-gray-400" />
                <div>
                  <div className="font-medium">{submission.fileName}</div>
                  <div className="text-sm text-gray-500">
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

          {submission.status === WorkSubmissionStatus.SUBMITTED && (
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button
                variant="outline"
                onClick={() => onDecline?.(submission)}
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                <XCircle className="w-4 h-4 mr-1" />
                Decline
              </Button>
              <Button
                onClick={() => onApprove?.(submission)}
                className="bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="w-4 h-4 mr-1" />
                Approve & Release Payment
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
