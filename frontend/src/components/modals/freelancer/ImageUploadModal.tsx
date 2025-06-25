"use client";

import type React from "react";

import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X, ImageIcon } from "lucide-react";
import Image from "next/image";
import { imageUpload } from "@/services/userService";
import { useSession } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";

interface ImageUploadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ImageUploadModal({
  open,
  onOpenChange,
}: ImageUploadModalProps) {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const userId = session?.user.id;

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback((file: File) => {
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  }, []);

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);

    const files = event.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !userId) return;

    setStatus("loading");
    try {
      // Simulate upload delay
      const res = await imageUpload(userId, selectedFile);

      if (res.status !== 201) {
        setStatus("error");
      }

      setStatus("success");
      await queryClient.invalidateQueries({
        queryKey: ["user", userId],
      });

      setTimeout(() => {
        handleClose();
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setStatus("idle");
    onOpenChange(false);
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Dialog open={open} modal onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Image</DialogTitle>
          <DialogDescription>
            Choose an image file to upload. Drag and drop or click to browse.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 overflow-hidden">
          {!selectedFile ? (
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                isDragOver
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:border-gray-400"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <ImageIcon className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <p className="text-sm text-gray-600 mb-2">
                Drag and drop your image here, or click to browse
              </p>
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="bg-white text-black"
              >
                Browse Files
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileInputChange}
                className="hidden"
              />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative w-full">
                {previewUrl && (
                  <div className="relative rounded-lg border bg-gray-50 w-full max-w-full">
                    <div className="w-full h-48 flex items-center justify-center">
                      <Image
                        src={previewUrl || "/placeholder.svg"}
                        alt="Preview"
                        width={400}
                        height={300}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-8 w-8"
                      onClick={removeFile}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
              <div className="text-sm text-gray-600">
                <p>
                  <strong>File:</strong> {selectedFile.name}
                </p>
                <p>
                  <strong>Size:</strong>{" "}
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
                <p>
                  <strong>Type:</strong> {selectedFile.type}
                </p>
              </div>
            </div>
          )}
        </div>

        {status === "success" && (
          <p className="text-green-500">Upload image successfully.</p>
        )}
        {status === "error" && (
          <p className="text-red-500">Failed to upload image.</p>
        )}

        <DialogFooter className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleClose}
            className="bg-white text-black"
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpload}
            disabled={!selectedFile || status === "loading"}
          >
            {status === "loading" ? "Uploading..." : "Upload"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
