"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import api from "@/services/api";

interface TitleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentTitle: string;
  userId: string;
}

export function TitleModal({
  open,
  onOpenChange,
  currentTitle,
  userId,
}: TitleModalProps) {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState(currentTitle);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const response = await api.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/update`,
        { id: userId, freelancerProfile: { title } }
      );

      if (response.status !== 200) {
        throw new Error("Failed to update title");
      }

      await queryClient.invalidateQueries({ queryKey: ["user"] });

      onOpenChange(false);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setTitle(currentTitle);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-[500px] bg-card text-card-foreground"
        showCloseButton={false}
      >
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <DialogTitle className="text-xl font-semibold">
            Edit your title
          </DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onOpenChange(false)}
            className="h-6 w-6 rounded-full"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Enter a single sentence description of your professional
            skills/experience (e.g. Expert Web Designer with Ajax experience)
          </p>

          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Your title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Enter your professional title"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button
            variant="ghost"
            onClick={handleCancel}
            className="text-green-600"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-green-600 hover:bg-green-700"
          >
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
