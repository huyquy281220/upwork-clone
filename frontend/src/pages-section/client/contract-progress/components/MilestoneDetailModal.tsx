"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, DollarSign, FileText, Download, Clock } from "lucide-react";
import { MilestoneProps } from "@/types/contract";
import { getMilestoneStatusColor } from "@/utils/getStatusColor";

interface MilestoneDetailModalProps {
  milestone: MilestoneProps;
  isOpen: boolean;
  onClose: () => void;
}

export function MilestoneDetailModal({
  milestone,
  isOpen,
  onClose,
}: MilestoneDetailModalProps) {
  if (!milestone) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "pdf":
        return "📄";
      case "doc":
      case "docx":
        return "📝";
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
        return "🖼️";
      case "zip":
      case "rar":
        return "📦";
      default:
        return "📎";
    }
  };

  const handleDownload = (fileUrl: string) => {
    window.open(fileUrl, "_blank");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Milestone Details</span>
            <Badge className={getMilestoneStatusColor(milestone.status)}>
              {milestone.status}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Milestone Info */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {milestone.title}
              </h3>
              {milestone.description && (
                <p className="text-gray-600 mt-1">{milestone.description}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Amount</p>
                  <p className="font-semibold text-gray-900">
                    {milestone.amount}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Due Date</p>
                  <p className="font-semibold text-gray-900">
                    {formatDate(milestone.dueDate)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* File Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-gray-600" />
              <h4 className="font-semibold text-gray-900">Submitted File</h4>
            </div>

            {milestone.fileUrl ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">
                      {getFileIcon(milestone.fileName.split(".").pop() || "")}
                    </span>
                    <div>
                      <p className="font-medium text-gray-900">
                        {milestone.fileName}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>
                          Type:{" "}
                          {(
                            milestone.fileName.split(".").pop() || ""
                          ).toUpperCase()}
                        </span>
                        <span>Size: {milestone.fileSize}</span>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>Due: {formatDate(milestone.dueDate)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownload(milestone.fileUrl)}
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <FileText className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                <p>No file attached to this milestone</p>
              </div>
            )}
          </div>

          {/* Submission Notes */}
          {milestone.status.toLowerCase() === "submitted" && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h5 className="font-medium text-blue-900 mb-2">
                Freelancer Notes
              </h5>
              <p className="text-blue-800 text-sm">
                &#34;I&#39;ve completed all the requirements for this milestone.
                The design files include the final mockups, source files, and
                exported assets as requested. Please review and let me know if
                any adjustments are needed.&#34;
              </p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
