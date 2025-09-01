"use client";

import type React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Plus,
  Upload,
  FileText,
  Download,
  Calendar,
  X,
  Clock,
  CheckCircle,
  ArrowLeft,
  Target,
} from "lucide-react";
import { ContractType } from "@/types/contract";
import {
  CreateWorkSubmissionProps,
  WorkSubmissionProps,
} from "@/types/work-submissions";
import Link from "next/link";
import { WorkLogProps } from "@/types/work-log";
import {
  formatDateFromISO,
  formatTimeFromISO,
  formatTimeRange,
} from "@/utils/formatDate";
import { EditSubmissionModal } from "./components/EditSubmissionModal";

type WorkSubmissionsProps = {
  canCreate: boolean;
  entries: WorkLogProps[];
  submissions: WorkSubmissionProps[];
  milestones?: Array<{ id: string; title: string; status: string }>;
  contractType: ContractType;
  onAddSubmission: (submission: CreateWorkSubmissionProps) => void;
  onUpdateSubmission: (
    id: string,
    submission: Partial<WorkSubmissionProps>
  ) => void;
};

const submissionSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be less than 100 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must be less than 1000 characters"),
  workLogId: z.string().optional(),
  milestoneId: z.string().optional(),
  file:
    typeof window !== "undefined"
      ? z.instanceof(File).optional()
      : z.any().optional(),
});

type SubmissionFormData = z.infer<typeof submissionSchema>;

const defaultSubmission: WorkSubmissionProps = {
  id: "",
  title: "",
  description: "",
  status: "draft",
  fileUrl: "",
  fileName: "",
  fileSize: 0,
  fileKey: "",
  createdAt: "",
  updatedAt: "",
  reviewedAt: "",
  contractId: "",
};

export function WorkSubmissions({
  canCreate,
  submissions,
  milestones,
  contractType,
  entries,
  onAddSubmission,
  onUpdateSubmission,
}: WorkSubmissionsProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<"selection" | "submission">(
    "selection"
  );
  const [selectedWorkLogId, setSelectedWorkLogId] = useState<string>("");
  const [selectedMilestoneId, setSelectedMilestoneId] = useState<string>("");
  const [selectedFiles, setSelectedFiles] = useState<File | null>(null);
  const [selectedSubmission, setSelectedSubmission] =
    useState<WorkSubmissionProps>(defaultSubmission);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedFiles(files[0]);
  };

  const removeFile = () => {
    setSelectedFiles(null);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    // setValue,
    // watch,
  } = useForm<SubmissionFormData>({
    resolver: zodResolver(submissionSchema),
    defaultValues: {
      title: "",
      description: "",
      workLogId: "",
      milestoneId: "",
      file: undefined,
    },
  });

  const onSubmit = (data: SubmissionFormData) => {
    onAddSubmission({
      ...data,
      contractId: selectedSubmission.contractId,
      workLogId: selectedWorkLogId || undefined,
      milestoneId: selectedMilestoneId || undefined,
      file: selectedFiles || data.file,
    } as CreateWorkSubmissionProps);

    setTimeout(() => {
      reset();
      setSelectedFiles(null);
      setSelectedWorkLogId("");
      setSelectedMilestoneId("");
      setCurrentStep("selection");
      setIsAddDialogOpen(false);
    }, 1500);
  };

  const handleWorkLogSelection = (workLogId: string) => {
    setSelectedWorkLogId(workLogId);
  };

  const handleMilestoneSelection = (milestoneId: string) => {
    setSelectedMilestoneId(milestoneId);
  };

  const handleNextStep = () => {
    if (selectedWorkLogId || selectedMilestoneId) {
      setCurrentStep("submission");
    }
  };

  const handleBackStep = () => {
    setCurrentStep("selection");
  };

  const handleDialogClose = (open: boolean) => {
    setIsAddDialogOpen(open);
    if (!open) {
      setCurrentStep("selection");
      setSelectedWorkLogId("");
      setSelectedMilestoneId("");
      reset();
      setSelectedFiles(null);
    }
  };

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
    setSelectedSubmission(defaultSubmission);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "default";
      case "submitted":
        return "secondary";
      case "revision_requested":
        return "destructive";
      default:
        return "outline";
    }
  };

  const selectedWorkLog = entries.find(
    (entry) => entry.id === selectedWorkLogId
  );
  const selectedMilestone = milestones?.find(
    (milestone) => milestone.id === selectedMilestoneId
  );

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    );
  };

  // Determine what to show based on contract type
  const isHourlyContract = contractType === ContractType.HOURLY;
  const showWorkLogs = isHourlyContract && entries.length > 0;
  const showMilestones =
    !isHourlyContract && milestones && milestones.length > 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
        <div>
          <h2 className="text-xl font-semibold text-foreground">
            Work Submissions
          </h2>
          <p className="text-sm text-foreground opacity-75">
            Submit your completed work and deliverables
          </p>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className="flex items-center gap-2 text-foreground"
              disabled={!canCreate}
            >
              <Plus className="w-4 h-4" />
              New Submission
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[40rem]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {currentStep === "submission" && (
                  <Button variant="ghost" size="sm" onClick={handleBackStep}>
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                )}
                {currentStep === "selection"
                  ? isHourlyContract
                    ? "Select Work Log"
                    : "Select Milestone"
                  : "Create Work Submission"}
              </DialogTitle>
            </DialogHeader>

            {/* Step 1: Selection */}
            {currentStep === "selection" && (
              <div className="space-y-6">
                <div className="text-sm text-foreground opacity-75">
                  {isHourlyContract
                    ? "Select a work log to include in this submission. This helps track which specific work is being delivered."
                    : "Select a milestone to include in this submission. This helps track which milestone deliverables are being submitted."}
                </div>

                {/* Selected Summary */}
                {(selectedWorkLogId && selectedWorkLog) ||
                (selectedMilestoneId && selectedMilestone) ? (
                  <div className="p-4 bg-subBackground rounded-lg">
                    <h4 className="font-medium mb-2">Selected Item</h4>
                    {selectedWorkLog && (
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-foreground font-semibold">
                            Type:
                          </span>
                          <div className="">Work Log</div>
                        </div>
                        <div>
                          <span className="text-foreground font-semibold">
                            Date:
                          </span>
                          <div className="">
                            {formatTimeRange(
                              selectedWorkLog.loggedAt,
                              selectedWorkLog.endTime
                            )}
                          </div>
                        </div>
                        <div>
                          <span className="text-foreground font-semibold">
                            Duration:
                          </span>
                          <div className="font-medium">
                            {selectedWorkLog.hours} hours
                          </div>
                        </div>
                        <div>
                          <span className="text-foreground font-semibold">
                            Description:
                          </span>
                          <div className="text-sm">
                            {selectedWorkLog.description}
                          </div>
                        </div>
                      </div>
                    )}
                    {selectedMilestone && (
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-foreground font-semibold">
                            Type:
                          </span>
                          <div className="">Milestone</div>
                        </div>
                        <div>
                          <span className="text-foreground font-semibold">
                            Title:
                          </span>
                          <div className="font-medium">
                            {selectedMilestone.title}
                          </div>
                        </div>
                        <div>
                          <span className="text-foreground font-semibold">
                            Status:
                          </span>
                          <div className="font-medium">
                            {selectedMilestone.status}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : null}

                {/* Work Logs List - Only for Hourly Contracts */}
                {showWorkLogs && (
                  <div className="space-y-3 max-h-48 overflow-y-auto">
                    <h4 className="font-medium text-sm text-foreground">
                      Work Logs
                    </h4>
                    {entries.map((entry) => (
                      <div
                        key={entry.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          selectedWorkLogId === entry.id
                            ? "border-green-500 bg-subBackground"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => handleWorkLogSelection(entry.id)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <div
                                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                  selectedWorkLogId === entry.id
                                    ? "border-green-500 bg-green-500"
                                    : "border-gray-300"
                                }`}
                              >
                                {selectedWorkLogId === entry.id && (
                                  <CheckCircle className="w-3 h-3 text-white" />
                                )}
                              </div>
                              <div className="font-medium">
                                {formatDateFromISO(entry.loggedAt)}
                              </div>
                            </div>
                            <p className="text-sm text-foreground mb-2">
                              {entry.description}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <span>
                                {formatTimeFromISO(
                                  entry.loggedAt,
                                  entry.endTime
                                )}
                              </span>
                              <span>{entry.hours} hours</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Milestones List - Only for Fixed-Price Contracts */}
                {showMilestones && (
                  <div className="space-y-3 max-h-48 overflow-y-auto">
                    <h4 className="font-medium text-sm text-foreground">
                      Milestones
                    </h4>
                    {milestones.map((milestone) => (
                      <div
                        key={milestone.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          selectedMilestoneId === milestone.id
                            ? "border-green-500 bg-subBackground"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => handleMilestoneSelection(milestone.id)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <div
                                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                  selectedMilestoneId === milestone.id
                                    ? "border-green-500 bg-green-500"
                                    : "border-gray-300"
                                }`}
                              >
                                {selectedMilestoneId === milestone.id && (
                                  <CheckCircle className="w-3 h-3 text-white" />
                                )}
                              </div>
                              <div className="font-medium">
                                {milestone.title}
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {milestone.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Empty States */}
                {!showWorkLogs && !showMilestones && (
                  <div className="text-center py-8 text-gray-500">
                    {isHourlyContract ? (
                      <>
                        <Clock className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                        <p>No work logs available</p>
                        <p className="text-sm">
                          Create some time entries first to include them in
                          submissions
                        </p>
                      </>
                    ) : (
                      <>
                        <Target className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                        <p>No milestones available</p>
                        <p className="text-sm">
                          Wait for milestones to be created by the client
                        </p>
                      </>
                    )}
                  </div>
                )}

                {/* Continue Button */}
                <div className="flex justify-end gap-2 pt-4 border-t">
                  <Button
                    variant="outline"
                    onClick={() => handleDialogClose(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleNextStep}
                    disabled={!selectedWorkLogId && !selectedMilestoneId}
                    className="text-white"
                  >
                    Continue{" "}
                    {selectedWorkLogId || selectedMilestoneId
                      ? "(1 selected)"
                      : ""}
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Submission Details */}
            {currentStep === "submission" && (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    {...register("title")}
                    placeholder="Enter submission title..."
                    className={errors.title ? "border-red-500" : ""}
                  />
                  {errors.title && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.title.message}
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    {...register("description")}
                    placeholder="Describe your work submission..."
                    rows={4}
                    className={errors.description ? "border-red-500" : ""}
                  />
                  {errors.description && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.description.message}
                    </div>
                  )}
                </div>

                <div>
                  <Label>Attachments</Label>
                  <div className="mt-2">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-2">
                        Drag and drop files here, or click to browse
                      </p>
                      <Input
                        type="file"
                        multiple
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                        accept=".zip,.7z,.rar"
                      />
                      <Button variant="outline" size="sm" asChild>
                        <label htmlFor="file-upload" className="cursor-pointer">
                          Choose Files
                        </label>
                      </Button>
                    </div>

                    {/* Selected Files List */}
                    {selectedFiles && (
                      <div className="mt-4 space-y-2">
                        <p className="text-sm font-medium text-foreground">
                          Selected Files:
                        </p>
                        <div className="flex items-center justify-between p-3 bg-subBackground rounded-lg border">
                          <div className="flex items-center space-x-3">
                            <FileText className="w-5 h-5 text-foreground" />
                            <div>
                              <p className="font-medium text-sm">
                                {selectedFiles.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {formatFileSize(selectedFiles.size)} •{" "}
                                {selectedFiles.type || ""}
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={removeFile}
                            type="button"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* File Upload Guidelines */}
                    <div className="mt-3 text-xs text-foreground">
                      <p>Supported formats: ZIP, 7Z, RAR</p>
                      <p>Maximum file size: 10MB per file</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleDialogClose(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="text-foreground"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Creating..." : "Create Submission"}
                  </Button>
                </div>
              </form>
            )}
          </DialogContent>
        </Dialog>
      </div>

      {/* Submissions List */}
      <div className="space-y-4">
        {submissions.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Upload className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                No submissions yet
              </h3>
              <p className="text-gray-500 mb-4">
                Create your first work submission to share your progress
              </p>
            </CardContent>
          </Card>
        ) : (
          submissions.map((submission) => (
            <Card key={submission.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <CardTitle className="text-lg">
                        {submission.title}
                      </CardTitle>
                      <Badge variant={getStatusColor(submission.status)}>
                        {submission.status.replace("_", " ")}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDateFromISO(submission.createdAt)}
                      </div>
                      {/* {submission.milestoneName && (
                        <div className="flex items-center gap-1">
                          <FileText className="w-4 h-4" />
                          {submission.milestoneName}
                        </div>
                      )} */}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedSubmission(submission);
                        setIsEditDialogOpen(true);
                      }}
                    >
                      Edit
                    </Button>
                    {submission.status === "draft" && (
                      <Button
                        size="sm"
                        onClick={() =>
                          onUpdateSubmission(submission.id, {
                            status: "submitted",
                          })
                        }
                      >
                        Submit
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-foreground opacity-75 mb-4 line-clamp-2">
                  {submission.description}
                </p>

                {/* Files */}
                {submission.fileUrl && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-foreground mb-2">
                      Attached Files
                    </h4>
                    <div className="flex items-center justify-between p-3 bg-subBackground rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-gray-400" />
                        <div>
                          <div className="text-sm font-medium text-foreground">
                            {submission.fileName}
                          </div>
                          <div className="text-xs text-foreground opacity-75">
                            {formatFileSize(submission.fileSize)}
                          </div>
                        </div>
                      </div>
                      <Link
                        href={submission.fileUrl}
                        target="_blank"
                        download={submission.fileName}
                      >
                        <Download className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <EditSubmissionModal
        isOpen={isEditDialogOpen}
        onClose={handleCloseEditDialog}
        submission={selectedSubmission as WorkSubmissionProps}
        contractType={contractType}
        onUpdateSubmission={onUpdateSubmission}
      />
    </div>
  );
}
