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
import { useSession } from "next-auth/react";
import { InfiniteLoading } from "@/components/common/InfiniteLoading";

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
  const { data: session } = useSession();
  const [title, setTitle] = useState(currentTitle);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSave = async () => {
    if (!title) return;

    setStatus("loading");

    try {
      const response = await api.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/update`,
        { id: userId, freelancerProfile: { title } }
      );

      if (response.status !== 200) {
        setStatus("error");
      }

      setStatus("success");

      await queryClient.invalidateQueries({
        queryKey: ["user", session?.user.id],
      });

      setTimeout(() => {
        onOpenChange(false);
      }, 1500);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    setStatus("idle");
    setTitle(currentTitle);
    onOpenChange(false);
  };

  if (!session) return <InfiniteLoading />;

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

        {status === "success" && (
          <p className="text-green-500">Edit title successfully.</p>
        )}
        {status === "error" && (
          <p className="text-red-500">Failed to edit title.</p>
        )}

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
            {status === "loading" ? "Saving..." : "Save"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
