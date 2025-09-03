"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Clock,
  CheckCircle,
  Calendar,
  TrendingUp,
  Eye,
  X,
  AlertTriangle,
} from "lucide-react";
import { MilestoneDetailModal } from "./components/MilestoneDetailModal";
import { ApproveModal } from "./components/ApproveModal";
import { DeclineModal } from "./components/DeclineModal";
import {
  ContractProps,
  ContractType,
  MilestoneProps,
  MilestoneStatus,
} from "@/types/contract";

const defaultMilestone = {
  id: "1",
  title: "",
  description: "",
  amount: 0,
  dueDate: "",
  status: MilestoneStatus.PENDING,
};

interface ProgressOverviewProps {
  contract: ContractProps;
  progress: number;
  totalPaid: number;
}

export function ProgressOverview({
  contract,
  totalPaid,
  progress,
}: ProgressOverviewProps) {
  const [selectedMilestone, setSelectedMilestone] =
    useState<MilestoneProps>(defaultMilestone);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [declineReason, setDeclineReason] = useState("");
  const [approvalNote, setApprovalNote] = useState("");

  const isHourly = contract.contractType === ContractType.HOURLY;

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "text-green-600";
    if (progress >= 50) return "text-blue-600";
    if (progress >= 25) return "text-yellow-600";
    return "text-red-600";
  };

  const getMilestoneStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "submitted":
        return "bg-blue-100 text-blue-800";
      case "in progress":
        return "bg-yellow-100 text-yellow-800";
      case "pending":
        return "bg-gray-100 text-gray-800";
      case "declined":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const calculateDaysRemaining = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleApprove = (milestone: MilestoneProps) => {
    setSelectedMilestone(milestone);
    setShowApprovalModal(true);
  };

  const handleDecline = (milestone: MilestoneProps) => {
    setSelectedMilestone(milestone);
    setShowDeclineModal(true);
  };

  const handleViewDetail = (milestone: MilestoneProps) => {
    setSelectedMilestone(milestone);
    setShowDetailModal(true);
  };

  const confirmApproval = () => {
    console.log(
      "Approving milestone:",
      selectedMilestone?.id,
      "with note:",
      approvalNote
    );
    setShowApprovalModal(false);
    setApprovalNote("");
    setSelectedMilestone(defaultMilestone);
  };

  const confirmDecline = () => {
    console.log(
      "Declining milestone:",
      selectedMilestone?.id,
      "with reason:",
      declineReason
    );
    setShowDeclineModal(false);
    setDeclineReason("");
    setSelectedMilestone(defaultMilestone);
  };

  // Function to determine if milestone should show action buttons
  const shouldShowActionButtons = (status: string) => {
    const statusLower = status.toLowerCase();
    return (
      statusLower === "submitted" ||
      statusLower === "in progress" ||
      statusLower === "pending" ||
      statusLower === "declined"
    );
  };

  return (
    <div className="space-y-6">
      {/* Overall Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5" />
            <span>Overall Progress</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                {isHourly ? "Work Completion" : "Project Progress"}
              </span>
              <span
                className={`text-sm font-semibold ${getProgressColor(
                  progress
                )}`}
              >
                {progress}%
              </span>
            </div>
            <Progress value={progress} className="h-3" />

            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {progress}%
                </div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {totalPaid}
                </div>
                <div className="text-sm text-gray-600">Total Paid</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {Math.ceil(
                    (new Date().getTime() -
                      new Date(contract.startedAt).getTime()) /
                      (1000 * 60 * 60 * 24)
                  )}
                </div>
                <div className="text-sm text-gray-600">Days Active</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Milestones Progress (Fixed Price Only) */}
      {!isHourly && contract.milestones && contract.milestones.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span>Milestone Progress</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {contract.milestones.map((milestone, index) => {
                const daysRemaining = calculateDaysRemaining(milestone.dueDate);
                const isOverdue =
                  daysRemaining < 0 &&
                  milestone.status.toLowerCase() !== "completed";
                const isCompleted =
                  milestone.status.toLowerCase() === "completed";
                const showActions = shouldShowActionButtons(milestone.status);

                return (
                  <div
                    key={milestone.id}
                    className="flex items-center space-x-4 p-4 border rounded-lg"
                  >
                    <div className="flex-shrink-0">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                          isCompleted
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {index + 1}
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-900">
                          {milestone.title}
                        </h4>
                        <div className="flex items-center space-x-2">
                          <Badge
                            className={getMilestoneStatusColor(
                              milestone.status
                            )}
                          >
                            {milestone.status}
                          </Badge>
                          {isOverdue && (
                            <Badge
                              variant="destructive"
                              className="flex items-center gap-1"
                            >
                              <AlertTriangle className="w-3 h-3" />
                              Overdue
                            </Badge>
                          )}
                          <span className="text-sm font-medium text-gray-900">
                            {milestone.amount}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>Due: {formatDate(milestone.dueDate)}</span>
                        </div>
                        {!isCompleted && (
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span className={isOverdue ? "text-red-600" : ""}>
                              {isOverdue
                                ? `${Math.abs(daysRemaining)} days overdue`
                                : `${daysRemaining} days remaining`}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Milestone Actions - Show for non-completed milestones */}
                      {showActions && !isCompleted && (
                        <div className="flex items-center space-x-2 mt-3 pt-3 border-t">
                          <Button
                            size="sm"
                            onClick={() => handleApprove(milestone)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Approve & Release Payment
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDecline(milestone)}
                          >
                            <X className="w-4 h-4 mr-1" />
                            Decline
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewDetail(milestone)}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View Detail
                          </Button>
                        </div>
                      )}

                      {/* Completed milestone actions */}
                      {isCompleted && (
                        <div className="flex items-center justify-between mt-3 pt-3 border-t">
                          <div className="flex items-center space-x-2 text-sm text-green-600">
                            <CheckCircle className="w-4 h-4" />
                            <span>
                              Payment released on{" "}
                              {formatDate(milestone.dueDate)}
                            </span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewDetail(milestone)}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View Detail
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Work Summary for Hourly Contracts */}
      {isHourly && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>Work Summary</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-600">
                    Total Hours Worked
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    127.5 hrs
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">This Week</div>
                  <div className="text-lg font-semibold text-gray-900">
                    32.5 hrs
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-600">Average per Week</div>
                  <div className="text-2xl font-bold text-gray-900">
                    28.3 hrs
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Hourly Rate</div>
                  <div className="text-lg font-semibold text-gray-900">
                    $75/hr
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Approval Modal */}
      <ApproveModal
        open={showApprovalModal}
        onOpenChange={setShowApprovalModal}
        selectedMilestone={selectedMilestone}
        approvalNote={approvalNote}
        setApprovalNote={setApprovalNote}
        onConfirm={confirmApproval}
      />

      {/* Decline Modal */}
      <DeclineModal
        open={showDeclineModal}
        onOpenChange={setShowDeclineModal}
        selectedMilestone={selectedMilestone}
        declineReason={declineReason}
        setDeclineReason={setDeclineReason}
        onConfirm={confirmDecline}
      />

      {/* Milestone Detail Modal */}
      <MilestoneDetailModal
        milestone={selectedMilestone}
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
      />
    </div>
  );
}
