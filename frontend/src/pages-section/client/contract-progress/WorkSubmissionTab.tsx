"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  FileText,
  Download,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  Eye,
  Star,
  AlertTriangle,
} from "lucide-react";

interface WorkSubmission {
  id: number;
  title: string;
  milestone: string;
  status: "submitted" | "approved" | "needs_revision" | "declined";
  submittedDate: string;
  amount: string;
  filesCount: number;
  description: string;
  files: Array<{
    id: number;
    name: string;
    type: string;
    size: string;
    url: string;
  }>;
}

const mockSubmissions: WorkSubmission[] = [
  {
    id: 1,
    title: "Project Setup & Planning",
    milestone: "Milestone 1",
    status: "approved",
    submittedDate: "2024-01-20",
    amount: "$1,000",
    filesCount: 3,
    description:
      "Completed initial project setup with requirements documentation and timeline.",
    files: [
      {
        id: 1,
        name: "requirements.pdf",
        type: "PDF",
        size: "2.5 MB",
        url: "#",
      },
      { id: 2, name: "timeline.xlsx", type: "Excel", size: "1.2 MB", url: "#" },
      {
        id: 3,
        name: "wireframes.fig",
        type: "Figma",
        size: "5.8 MB",
        url: "#",
      },
    ],
  },
  {
    id: 2,
    title: "Frontend Development",
    milestone: "Milestone 2",
    status: "submitted",
    submittedDate: "2024-02-08",
    amount: "$2,000",
    filesCount: 2,
    description:
      "Frontend development completed with responsive design and all requested features.",
    files: [
      {
        id: 4,
        name: "frontend-build.zip",
        type: "ZIP",
        size: "15.2 MB",
        url: "#",
      },
      {
        id: 5,
        name: "component-docs.pdf",
        type: "PDF",
        size: "3.1 MB",
        url: "#",
      },
    ],
  },
  {
    id: 3,
    title: "Backend API Development",
    milestone: "Milestone 3",
    status: "needs_revision",
    submittedDate: "2024-02-15",
    amount: "$1,500",
    filesCount: 4,
    description: "Backend API with authentication and database integration.",
    files: [
      { id: 6, name: "api-source.zip", type: "ZIP", size: "8.7 MB", url: "#" },
      { id: 7, name: "api-docs.pdf", type: "PDF", size: "2.2 MB", url: "#" },
      {
        id: 8,
        name: "database-schema.sql",
        type: "SQL",
        size: "0.5 MB",
        url: "#",
      },
      {
        id: 9,
        name: "postman-collection.json",
        type: "JSON",
        size: "0.3 MB",
        url: "#",
      },
    ],
  },
];

export function WorkSubmissionsTab() {
  const [submissions] = useState<WorkSubmission[]>(mockSubmissions);
  const [selectedSubmission, setSelectedSubmission] =
    useState<WorkSubmission | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [declineReason, setDeclineReason] = useState("");

  const filteredSubmissions = submissions.filter((submission) => {
    const matchesSearch =
      submission.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.milestone.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || submission.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleViewDetail = (submission: WorkSubmission) => {
    setSelectedSubmission(submission);
    setIsDetailModalOpen(true);
  };

  const handleApprove = (submission: WorkSubmission) => {
    setSelectedSubmission(submission);
    setIsApproveModalOpen(true);
  };

  const handleDecline = (submission: WorkSubmission) => {
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
    setSelectedSubmission(null);
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
    setSelectedSubmission(null);
  };

  const getRatingText = (rating: number) => {
    switch (rating) {
      case 1:
        return "Poor - Work needs significant improvement";
      case 2:
        return "Below Average - Work needs improvement";
      case 3:
        return "Average - Work meets basic requirements";
      case 4:
        return "Good - Work exceeds expectations";
      case 5:
        return "Excellent - Outstanding work quality";
      default:
        return "Click to rate the freelancer's work";
    }
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

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search submissions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="submitted">Submitted</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="needs_revision">Needs Revision</SelectItem>
                  <SelectItem value="declined">Declined</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Submissions List */}
      <div className="space-y-4">
        {filteredSubmissions.map((submission) => (
          <Card
            key={submission.id}
            className="hover:shadow-md transition-shadow"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg">
                      {submission.title}
                    </h3>
                    <Badge className={getStatusColor(submission.status)}>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(submission.status)}
                        {submission.status.replace("_", " ").toUpperCase()}
                      </div>
                    </Badge>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <span>{submission.milestone}</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Submitted {formatDate(submission.submittedDate)}
                    </span>
                    <span className="flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      {submission.filesCount} files
                    </span>
                    <span className="font-medium text-gray-900">
                      {submission.amount}
                    </span>
                  </div>

                  <p className="text-gray-700 text-sm">
                    {submission.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleViewDetail(submission)}
                    className="flex items-center gap-1"
                  >
                    <Eye className="w-4 h-4" />
                    View Detail
                  </Button>

                  {submission.status === "submitted" && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDecline(submission)}
                        className="flex items-center gap-1 text-red-600 border-red-200 hover:bg-red-50"
                      >
                        <XCircle className="w-4 h-4" />
                        Decline
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleApprove(submission)}
                        className="flex items-center gap-1 bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Approve & Release Payment
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detail Modal */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              {selectedSubmission?.title}
            </DialogTitle>
          </DialogHeader>

          {selectedSubmission && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <span className="text-sm text-gray-600">Status:</span>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge
                      className={getStatusColor(selectedSubmission.status)}
                    >
                      <div className="flex items-center gap-1">
                        {getStatusIcon(selectedSubmission.status)}
                        {selectedSubmission.status
                          .replace("_", " ")
                          .toUpperCase()}
                      </div>
                    </Badge>
                  </div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Amount:</span>
                  <div className="font-medium mt-1">
                    {selectedSubmission.amount}
                  </div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Milestone:</span>
                  <div className="font-medium mt-1">
                    {selectedSubmission.milestone}
                  </div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Submitted:</span>
                  <div className="font-medium mt-1">
                    {formatDate(selectedSubmission.submittedDate)}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Description</h4>
                <p className="text-gray-700">
                  {selectedSubmission.description}
                </p>
              </div>

              <div>
                <h4 className="font-medium mb-3">
                  Submitted Files ({selectedSubmission.files.length})
                </h4>
                <div className="space-y-3">
                  {selectedSubmission.files.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="w-8 h-8 text-gray-400" />
                        <div>
                          <div className="font-medium">{file.name}</div>
                          <div className="text-sm text-gray-500">
                            {file.type} • {file.size}
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1 bg-transparent"
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Approve Modal with Rating */}
      <Dialog open={isApproveModalOpen} onOpenChange={setIsApproveModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Approve Submission
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <p className="text-gray-700">
              Are you sure you want to approve this submission and release the
              payment?
            </p>

            {selectedSubmission && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="font-medium">{selectedSubmission.title}</div>
                <div className="text-sm text-gray-600 mt-1">
                  {selectedSubmission.amount}
                </div>
              </div>
            )}

            {/* Rating Section */}
            <div className="space-y-3">
              <Label className="text-base font-medium">
                Rate the freelancer&#39;s work
              </Label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Button
                    key={star}
                    type="button"
                    className="p-1 hover:scale-110 transition-transform"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                  >
                    <Star
                      className={`w-8 h-8 transition-colors ${
                        star <= (hoveredRating || rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300 hover:text-yellow-300"
                      }`}
                    />
                  </Button>
                ))}
              </div>
              <p className="text-sm text-gray-600 min-h-[20px]">
                {getRatingText(hoveredRating || rating)}
              </p>
            </div>

            {/* Feedback Section */}
            <div>
              <Label htmlFor="approval-feedback">
                Feedback for freelancer (optional)
              </Label>
              <Textarea
                id="approval-feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Great work! The deliverables meet all requirements..."
                rows={3}
                className="mt-1"
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setIsApproveModalOpen(false);
                  setRating(0);
                  setFeedback("");
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={confirmApproval}
                className="bg-green-600 hover:bg-green-700"
                disabled={rating === 0}
              >
                Approve & Release Payment
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Decline Modal */}
      <Dialog open={isDeclineModalOpen} onOpenChange={setIsDeclineModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-600" />
              Decline Submission
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <p className="text-gray-700">
              Please provide a reason for declining this submission.
            </p>

            {selectedSubmission && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="font-medium">{selectedSubmission.title}</div>
                <div className="text-sm text-gray-600 mt-1">
                  {selectedSubmission.amount}
                </div>
              </div>
            )}

            <div>
              <Label htmlFor="decline-reason">Reason for declining *</Label>
              <Textarea
                id="decline-reason"
                value={declineReason}
                onChange={(e) => setDeclineReason(e.target.value)}
                placeholder="Please explain what needs to be changed or improved..."
                rows={4}
                required
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setIsDeclineModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={confirmDecline}
                disabled={!declineReason.trim()}
                className="bg-red-600 hover:bg-red-700"
              >
                Decline Submission
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
