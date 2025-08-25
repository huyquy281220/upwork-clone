"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, ImageIcon } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IconPdf } from "@/assets/svg";

interface AttachmentsSectionProps {
  setAttachments: (file: File | null) => void;
}

export function AttachmentsSection({
  setAttachments,
}: AttachmentsSectionProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleFileSelect = useCallback((file: File) => {
    if (!file || !file.type.startsWith("application/pdf")) {
      alert("Please upload a PDF file");
      return;
    }
    setAttachments(file);
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  }, []);

  // const handleFileUpload = () => {};

  const removeFile = () => {
    setAttachments(null);
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
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

  // const formatFileSize = (bytes: number) => {
  //   if (bytes === 0) return "0 Bytes";
  //   const k = 1024;
  //   const sizes = ["Bytes", "KB", "MB", "GB"];
  //   const i = Math.floor(Math.log(bytes) / Math.log(k));
  //   return (
  //     Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  //   );
  // };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Attachments</CardTitle>
        <p className="text-sm text-text-foreground opacity-80">
          Add work samples or documents that showcase your expertise.
        </p>
      </CardHeader>
      <CardContent>
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
            <p className="text-sm text-text-foreground opacity-80 mb-2">
              Drag and drop your pdf file here, or click to browse
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
              accept=".pdf"
              onChange={handleFileInputChange}
              className="hidden"
              title="Upload a PDF file"
              placeholder="Upload a PDF file"
            />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative w-full">
              {previewUrl && (
                <div className="relative rounded-lg w-full max-w-full">
                  <div className="w-full h-48 flex items-center justify-center">
                    <Image
                      src={IconPdf}
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
                <strong className="text-foreground">File: </strong>
                <Link
                  href={previewUrl ?? ""}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-green-400"
                >
                  {selectedFile.name}
                </Link>
              </p>
              <p className="text-foreground">
                <strong>Size:</strong>{" "}
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
