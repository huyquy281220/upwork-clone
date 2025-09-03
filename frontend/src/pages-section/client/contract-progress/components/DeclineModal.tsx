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

type DeclineModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedMilestone: MilestoneProps;
  declineReason: string;
  setDeclineReason: (val: string) => void;
  onConfirm: () => void;
};

export function DeclineModal({
  open,
  onOpenChange,
  selectedMilestone,
  declineReason,
  setDeclineReason,
  onConfirm,
}: DeclineModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Decline Milestone</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>Please provide a reason for declining this milestone:</p>
          {selectedMilestone && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium">{selectedMilestone.title}</h4>
              <p className="text-sm text-gray-600">
                Amount: {selectedMilestone.amount}
              </p>
            </div>
          )}
          <div>
            <Label htmlFor="decline-reason">Reason for decline *</Label>
            <Textarea
              id="decline-reason"
              placeholder="The deliverables don't meet the requirements because..."
              value={declineReason}
              onChange={(e) => setDeclineReason(e.target.value)}
              required
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            disabled={!declineReason.trim()}
            variant="destructive"
          >
            Decline Milestone
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
