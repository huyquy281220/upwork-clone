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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Upload,
  FileText,
  Download,
  Calendar,
  MessageSquare,
} from "lucide-react";
import { ContractType } from "@/types/contract";
import {
  CreateWorkSubmissionProps,
  WorkSubmissionProps,
} from "@/types/work-submissions";

interface WorkSubmission {
  id: string;
  title: string;
  description: string;
  submittedDate: string;
  status: "draft" | "submitted" | "approved" | "revision_requested";
  files: Array<{
    id: string;
    name: string;
    size: number;
    type: string;
    url: string;
  }>;
  feedback?: string;
  milestoneId?: string;
  milestoneName?: string;
}

interface WorkSubmissionsProps {
  submissions: WorkSubmission[];
  milestones?: Array<{ id: string; name: string; status: string }>;
  contractType: ContractType;
  onAddSubmission: (submission: CreateWorkSubmissionProps) => void;
  onUpdateSubmission: (
    id: string,
    submission: Partial<WorkSubmissionProps>
  ) => void;
}

// Validation schema
const submissionSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be less than 100 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must be less than 1000 characters"),
  milestoneId: z.string().optional(),
});

type SubmissionFormData = z.infer<typeof submissionSchema>;

export function WorkSubmissions({
  submissions,
  milestones,
  contractType,
  onAddSubmission,
  onUpdateSubmission,
}: WorkSubmissionsProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<SubmissionFormData>({
    resolver: zodResolver(submissionSchema),
    defaultValues: {
      title: "",
      description: "",
      milestoneId: "",
    },
  });

  const onSubmit = (data: SubmissionFormData) => {
    // const milestone = milestones?.find((m) => m.id === data.milestoneId);

    onAddSubmission({
      ...data,
      // milestoneName: milestone?.name,
      file: null,
    });

    reset();
    setIsAddDialogOpen(false);
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

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
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
            <Button className="flex items-center gap-2 text-foreground">
              <Plus className="w-4 h-4" />
              New Submission
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create Work Submission</DialogTitle>
            </DialogHeader>
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

              {contractType === ContractType.FIXED_PRICE &&
                milestones &&
                milestones.length > 0 && (
                  <div>
                    <Label htmlFor="milestoneId">Milestone (Optional)</Label>
                    <Select
                      value={watch("milestoneId")}
                      onValueChange={(value) => setValue("milestoneId", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a milestone" />
                      </SelectTrigger>
                      <SelectContent>
                        {milestones.map((milestone) => (
                          <SelectItem key={milestone.id} value={milestone.id}>
                            {milestone.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

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

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsAddDialogOpen(false);
                    reset();
                  }}
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

                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {submission.submittedDate}
                      </div>
                      {submission.milestoneName && (
                        <div className="flex items-center gap-1">
                          <FileText className="w-4 h-4" />
                          {submission.milestoneName}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
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
                <p className="text-gray-700 mb-4">{submission.description}</p>

                {/* Files */}
                {submission.files.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Attached Files
                    </h4>
                    <div className="space-y-2">
                      {submission.files.map((file) => (
                        <div
                          key={file.id}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-gray-400" />
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {file.name}
                              </div>
                              <div className="text-xs text-gray-500">
                                {formatFileSize(file.size)}
                              </div>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Feedback */}
                {submission.feedback && (
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageSquare className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-900">
                        Client Feedback
                      </span>
                    </div>
                    <p className="text-sm text-blue-800">
                      {submission.feedback}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
