"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  AlertTriangle,
} from "lucide-react";
import { ApproveSubmissionModal } from "./components/ApproveSubmissionModal";
import { DeclineSubmissionModal } from "./components/DeclineSubmissionModal";
import { ViewSubmissionModal } from "./components/ViewSubmissionModal";
import {
  WorkSubmissionProps,
  WorkSubmissionStatus,
} from "@/types/work-submissions";
import { formatDateToMonthDayYear } from "@/utils/formatDate";
import { getWorkSubmissionStatusColor } from "@/utils/getStatusColor";
import { MilestoneProps } from "@/types/contract";

type WorkSubmissionsTabProps = {
  submissions: WorkSubmissionProps[];
  milestones: MilestoneProps[];
};

const defaultSubmission: WorkSubmissionProps = {
  id: "",
  title: "",
  description: "",
  fileUrl: "",
  fileName: "",
  fileSize: 0,
  fileKey: "",
  status: "",
  createdAt: "",
  updatedAt: "",
  reviewedAt: "",
  contractId: "",
};

export function WorkSubmissionsTab({
  submissions,
  milestones,
}: WorkSubmissionsTabProps) {
  const [selectedSubmission, setSelectedSubmission] =
    useState<WorkSubmissionProps>(defaultSubmission);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [declineReason, setDeclineReason] = useState("");

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

  const handleViewDetail = (submission: WorkSubmissionProps) => {
    setSelectedSubmission(submission);
    setIsDetailModalOpen(true);
  };

  const handleApprove = (submission: WorkSubmissionProps) => {
    setSelectedSubmission(submission);
    setIsApproveModalOpen(true);
  };

  const handleDecline = (submission: WorkSubmissionProps) => {
    setSelectedSubmission(submission);
    setIsDeclineModalOpen(true);
  };

  const confirmApproval = () => {
    if (selectedSubmission) {
      console.log(
        "Approved submission:",
        selectedSubmission.id,
        "Rating:",
        rating,
        "Feedback:",
        feedback
      );
      // Handle approval logic here
    }
    setIsApproveModalOpen(false);
    setRating(0);
    setFeedback("");
    setSelectedSubmission(defaultSubmission);
  };

  const confirmDecline = () => {
    if (selectedSubmission && declineReason.trim()) {
      console.log(
        "Declined submission:",
        selectedSubmission.id,
        "Reason:",
        declineReason
      );
      // Handle decline logic here
    }
    setIsDeclineModalOpen(false);
    setDeclineReason("");
    setSelectedSubmission(defaultSubmission);
  };

  const getMilestoneAmount = (workSubmission: WorkSubmissionProps) => {
    const milestoneId = workSubmission.milestoneId;
    const milestone = milestones.find((m) => m.id === milestoneId);
    return milestone?.amount;
  };

  // Stats calculation
  const stats = {
    awaitingReview: submissions.filter((s) => s.status === "submitted").length,
    approved: submissions.filter((s) => s.status === "approved").length,
    needsRevision: submissions.filter((s) => s.status === "needs_revision")
      .length,
    total: submissions.length,
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Awaiting Review</p>
                <p className="text-2xl font-bold text-blue-600">
                  {stats.awaitingReview}
                </p>
              </div>
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-green-600">
                  {stats.approved}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Needs Revision</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {stats.needsRevision}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Submissions</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.total}
                </p>
              </div>
              <FileText className="w-8 h-8 text-gray-600" />
            </div>
          </CardContent>
        </Card>
      </div>
      {/* 853,1783 */}
      {/* Submissions List */}
      <div className="space-y-4">
        {submissions.map((submission) => (
          <Card
            key={submission.id}
            className="hover:shadow-md transition-shadow"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-2xl">
                      {submission.title}
                    </h3>
                    <Badge
                      className={getWorkSubmissionStatusColor(
                        submission.status
                      )}
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
                      ${getMilestoneAmount(submission)}
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

      {/* Detail Modal */}
      <ViewSubmissionModal
        submission={selectedSubmission}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
      />

      {/* Approve Modal with Rating */}
      <ApproveSubmissionModal
        submission={selectedSubmission}
        amount={getMilestoneAmount(selectedSubmission) ?? 0}
        isOpen={isApproveModalOpen}
        onClose={() => setIsApproveModalOpen(false)}
        onConfirm={confirmApproval}
      />

      {/* Decline Modal */}
      <DeclineSubmissionModal
        submission={selectedSubmission}
        amount={getMilestoneAmount(selectedSubmission) ?? 0}
        isOpen={isDeclineModalOpen}
        onClose={() => setIsDeclineModalOpen(false)}
        onConfirm={confirmDecline}
      />
    </div>
  );
}
