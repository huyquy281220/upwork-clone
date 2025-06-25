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
import api from "@/services/api";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

interface ProfileOverviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentOverview: string;
  userId: string;
}

export function ProfileOverviewModal({
  open,
  onOpenChange,
  currentOverview,
  userId,
}: ProfileOverviewModalProps) {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const [overview, setOverview] = useState(currentOverview);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const maxLength = 5000;
  const remainingChars = maxLength - overview.length;

  const handleSave = async () => {
    if (!overview) return;
    setStatus("loading");

    try {
      const response = await api.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/update`,
        { id: userId, freelancerProfile: { overview } }
      );

      if (response.status !== 200) {
        setStatus("error");
      }

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
    setOverview(currentOverview);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-[600px] bg-card text-card-foreground"
        showCloseButton={false}
      >
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <DialogTitle className="text-xl font-semibold">
            Profile overview
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
            Use this space to show clients you have the skills and experience
            they&#39;re looking for.
          </p>

          <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
            <li>Describe your strengths and skills</li>
            <li>Highlight projects, accomplishments and education</li>
            <li>Keep it short and make sure it&#39;s error-free</li>
          </ul>

          <Button variant="link" className="text-green-600 p-0 h-auto">
            Learn more about building your profile
          </Button>

          <div className="space-y-2">
            <label htmlFor="overview" className="text-sm font-medium">
              Profile overview
            </label>
            <textarea
              id="overview"
              value={overview}
              onChange={(e) => setOverview(e.target.value)}
              className="w-full min-h-[200px] rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 resize-none"
              placeholder="Help people get to know you at a glance. What work do you do best? Tell them clearly, using paragraphs or bullet points. You can always edit later; just make sure you proofread now."
              maxLength={maxLength}
            />
            <div className="text-right text-xs text-muted-foreground">
              {remainingChars} characters left
            </div>
          </div>
        </div>

        {status === "success" && (
          <p className="text-green-500">Edit overview successfully.</p>
        )}
        {status === "error" && (
          <p className="text-red-500">Failed to edit overview.</p>
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
