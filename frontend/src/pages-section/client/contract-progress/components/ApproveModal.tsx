"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MilestoneProps } from "@/types/contract";

type ApproveModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedMilestone: MilestoneProps;
  approvalNote: string;
  setApprovalNote: (val: string) => void;
  onConfirm: () => void;
};

export function ApproveModal({
  open,
  onOpenChange,
  selectedMilestone,
  approvalNote,
  setApprovalNote,
  onConfirm,
}: ApproveModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Approve Milestone</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>
            Are you sure you want to approve this milestone and release the
            payment?
          </p>
          {selectedMilestone && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium">{selectedMilestone.title}</h4>
              <p className="text-sm text-gray-600">
                Amount: {selectedMilestone.amount}
              </p>
            </div>
          )}
          <div>
            <Label htmlFor="approval-note">
              Optional note (visible to freelancer)
            </Label>
            <Textarea
              id="approval-note"
              placeholder="Great work! The deliverables meet all requirements..."
              value={approvalNote}
              onChange={(e) => setApprovalNote(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="bg-green-600 hover:bg-green-700"
          >
            Approve & Release Payment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
