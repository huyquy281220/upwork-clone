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
import { CheckCircle, Star } from "lucide-react";
import { WorkSubmissionProps } from "@/types/work-submissions";

interface ApproveSubmissionModalProps {
  submission: WorkSubmissionProps;
  isOpen: boolean;
  amount: number;
  onClose: () => void;
  onConfirm: (submissionId: string, feedback?: string, rating?: number) => void;
}

export function ApproveSubmissionModal({
  submission,
  isOpen,
  amount,
  onClose,
  onConfirm,
}: ApproveSubmissionModalProps) {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  if (!submission) return null;

  const handleConfirm = () => {
    onConfirm(submission.id, feedback, rating);
    setFeedback("");
    setRating(0);
    onClose();
  };

  const handleClose = () => {
    setFeedback("");
    setRating(0);
    onClose();
  };

  const getRatingText = (rating: number) => {
    switch (rating) {
      case 1:
        return "Poor - Work needs significant improvement";
      case 2:
        return "Below Average - Work needs improvement";
      case 3:
        return "Average - Work meets basic requirements";
      case 4:
        return "Good - Work exceeds expectations";
      case 5:
        return "Excellent - Outstanding work quality";
      default:
        return "Click to rate the freelancer's work";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            Approve Submission
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <p className="text-gray-700">
            Are you sure you want to approve this submission and release the
            payment?
          </p>

          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="font-medium">{submission.title}</div>
            <div className="text-sm text-gray-600 mt-1">{amount}</div>
          </div>

          {/* Rating Section */}
          <div className="space-y-3">
            <Label className="text-base font-medium">
              Rate the freelancer&#39;s work
            </Label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Button
                  key={star}
                  type="button"
                  className="p-1 hover:scale-110 transition-transform"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                >
                  <Star
                    className={`w-8 h-8 transition-colors ${
                      star <= (hoveredRating || rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300 hover:text-yellow-300"
                    }`}
                  />
                </Button>
              ))}
            </div>
            <p className="text-sm text-gray-600 min-h-[20px]">
              {getRatingText(hoveredRating || rating)}
            </p>
          </div>

          {/* Feedback Section */}
          <div>
            <Label htmlFor="approval-feedback">
              Feedback for freelancer (optional)
            </Label>
            <Textarea
              id="approval-feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Great work! The deliverables meet all requirements..."
              rows={3}
              className="mt-1"
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              className="bg-green-600 hover:bg-green-700"
              disabled={rating === 0}
            >
              Approve & Release Payment
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
