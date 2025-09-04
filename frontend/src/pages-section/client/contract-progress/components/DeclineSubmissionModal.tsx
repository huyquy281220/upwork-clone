"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { XCircle } from "lucide-react";

interface DeclineSubmissionModalProps {
  submission: {
    id: number;
    title: string;
    amount: string;
  } | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (submissionId: number, reason: string) => void;
}

export function DeclineSubmissionModal({
  submission,
  isOpen,
  onClose,
  onConfirm,
}: DeclineSubmissionModalProps) {
  const [declineReason, setDeclineReason] = useState("");

  if (!submission) return null;

  const handleConfirm = () => {
    if (declineReason.trim()) {
      onConfirm(submission.id, declineReason);
      setDeclineReason("");
      onClose();
    }
  };

  const handleClose = () => {
    setDeclineReason("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
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

          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="font-medium">{submission.title}</div>
            <div className="text-sm text-gray-600 mt-1">
              {submission.amount}
            </div>
          </div>

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
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={!declineReason.trim()}
              className="bg-red-600 hover:bg-red-700"
            >
              Decline Submission
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
