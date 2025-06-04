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

interface ProfileOverviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentOverview: string;
  onSave: (overview: string) => void;
}

export function ProfileOverviewModal({
  open,
  onOpenChange,
  currentOverview,
  onSave,
}: ProfileOverviewModalProps) {
  const [overview, setOverview] = useState(currentOverview);
  const maxLength = 5000;
  const remainingChars = maxLength - overview.length;

  const handleSave = () => {
    onSave(overview);
    onOpenChange(false);
  };

  const handleCancel = () => {
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
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
