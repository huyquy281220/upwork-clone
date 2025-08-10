"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
import { Upload, FileText, Download, X } from "lucide-react";
import { ContractType } from "@/types/contract";
import {
  UpdateWorkSubmissionProps,
  WorkSubmissionProps,
} from "@/types/work-submissions";
import Link from "next/link";

type EditSubmissionModalProps = {
  submission: WorkSubmissionProps;
  milestones?: Array<{ id: string; name: string; status: string }>;
  contractType: ContractType;
  onUpdateSubmission: (
    id: string,
    submission: Partial<WorkSubmissionProps>
  ) => void;
  isOpen: boolean;
  onClose: () => void;
};

const editSubmissionSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be less than 100 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must be less than 1000 characters"),
  milestoneId: z.string().optional(),
  file:
    typeof window !== "undefined"
      ? z.instanceof(File).optional()
      : z.any().optional(),
});

type EditSubmissionFormData = z.infer<typeof editSubmissionSchema>;

export function EditSubmissionModal({
  submission,
  milestones,
  contractType,
  onUpdateSubmission,
  isOpen,
  onClose,
}: EditSubmissionModalProps) {
  const [selectedFiles, setSelectedFiles] = useState<File | null>(null);
  const [hasFileChanged, setHasFileChanged] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedFiles(files[0]);
    setHasFileChanged(true);
  };

  const removeFile = () => {
    setSelectedFiles(null);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<EditSubmissionFormData>({
    resolver: zodResolver(editSubmissionSchema),
    defaultValues: {
      title: submission.title,
      description: submission.description,
      //   milestoneId: submission.milestoneId,
      file: undefined,
    },
  });

  useEffect(() => {
    if (isOpen && submission) {
      setValue("title", submission.title);
      setValue("description", submission.description);
      //   setValue("milestoneId", submission.milestoneId);
    }
  }, [isOpen, submission]);

  const onSubmit = (data: EditSubmissionFormData) => {
    const updateData: UpdateWorkSubmissionProps = {
      title: data.title,
      description: data.description,
      //   milestoneId: data.milestoneId,
    };

    // Only include file if a new one is selected
    if (selectedFiles) {
      updateData.file = selectedFiles;
    }

    onUpdateSubmission(submission.id, updateData);
    setTimeout(() => {
      reset();
      setSelectedFiles(null);
      onClose();
    }, 1500);
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

  const isChanged =
    watch("title") !== submission.title ||
    watch("description") !== submission.description ||
    hasFileChanged;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Work Submission</DialogTitle>
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

          <div>
            <Label>Current File</Label>
            {submission.fileUrl && (
              <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {submission.fileName}
                      </div>
                      <div className="text-xs text-gray-500">
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
          </div>

          <div>
            <Label>Replace File (Optional)</Label>
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
                  id="file-upload-edit"
                  accept=".zip,.7z,.rar"
                />
                <Button variant="outline" size="sm" asChild>
                  <label htmlFor="file-upload-edit" className="cursor-pointer">
                    Choose Files
                  </label>
                </Button>
              </div>

              {/* Selected Files List */}
              {selectedFiles && (
                <div className="mt-4 space-y-2">
                  <p className="text-sm font-medium text-gray-700">New File:</p>
                  <div className="flex items-center justify-between p-3 bg-subBackground rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-foreground" />
                      <div>
                        <p className="font-medium text-sm">
                          {selectedFiles.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatFileSize(selectedFiles.size)} •{" "}
                          {selectedFiles.type || "Unknown type"}
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
              <div className="mt-3 text-xs text-gray-500">
                <p>Supported formats: ZIP, 7Z, RAR</p>
                <p>Maximum file size: 10MB per file</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                onClose();
                reset();
                setSelectedFiles(null);
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="text-foreground"
              disabled={isSubmitting || !isChanged}
            >
              {isSubmitting ? "Updating..." : "Update Submission"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
