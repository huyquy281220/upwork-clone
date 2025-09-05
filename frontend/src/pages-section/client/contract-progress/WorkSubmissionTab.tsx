"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import { ApproveSubmissionModal } from "./components/ApproveSubmissionModal";
import { DeclineSubmissionModal } from "./components/DeclineSubmissionModal";
import { ViewSubmissionModal } from "./components/ViewSubmissionModal";
import { WorkSubmissionProps } from "@/types/work-submissions";
import { MilestoneProps } from "@/types/contract";
import { SubmissionList } from "./components/SubmissionList";

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

export const getMilestoneAmount = (
  workSubmission: WorkSubmissionProps,
  milestones: MilestoneProps[]
) => {
  const milestoneId = workSubmission.milestoneId;
  const milestone = milestones.find((m) => m.id === milestoneId);
  return milestone?.amount;
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
                <p className="text-sm text-foreground">Awaiting Review</p>
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
                <p className="text-sm text-foreground">Approved</p>
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
                <p className="text-sm text-foreground">Needs Revision</p>
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
                <p className="text-sm text-foreground">Total Submissions</p>
                <p className="text-2xl font-bold text-indigo-500">
                  {stats.total}
                </p>
              </div>
              <FileText className="w-8 h-8 text-indigo-500" />
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Submissions List */}
      <SubmissionList
        submissions={submissions}
        milestones={milestones}
        handleApprove={handleApprove}
        handleDecline={handleDecline}
        handleViewDetail={handleViewDetail}
      />

      {/* Detail Modal */}
      <ViewSubmissionModal
        submission={selectedSubmission}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
      />

      {/* Approve Modal with Rating */}
      <ApproveSubmissionModal
        submission={selectedSubmission}
        amount={getMilestoneAmount(selectedSubmission, milestones) ?? 0}
        isOpen={isApproveModalOpen}
        onClose={() => setIsApproveModalOpen(false)}
        onConfirm={confirmApproval}
      />

      {/* Decline Modal */}
      <DeclineSubmissionModal
        submission={selectedSubmission}
        amount={getMilestoneAmount(selectedSubmission, milestones) ?? 0}
        isOpen={isDeclineModalOpen}
        onClose={() => setIsDeclineModalOpen(false)}
        onConfirm={confirmDecline}
      />
    </div>
  );
}
