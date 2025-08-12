"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle, X, MessageSquare, AlertTriangle } from "lucide-react";

interface ContractActionsProps {
  contractStatus: string;
  onAccept: () => void;
  onDecline: (reason: string) => void;
  onRequestChanges: (message: string) => void;
  isProcessing: boolean;
}

export function ContractActions({
  contractStatus,
  onAccept,
  onDecline,
  onRequestChanges,
  isProcessing,
}: ContractActionsProps) {
  const [declineModalOpen, setDeclineModalOpen] = useState(false);
  const [changesModalOpen, setChangesModalOpen] = useState(false);
  const [declineReason, setDeclineReason] = useState("");
  const [changesMessage, setChangesMessage] = useState("");

  if (contractStatus !== "pending") {
    return null;
  }

  const handleDecline = () => {
    onDecline(declineReason);
    setDeclineModalOpen(false);
    setDeclineReason("");
  };

  const handleRequestChanges = () => {
    onRequestChanges(changesMessage);
    setChangesModalOpen(false);
    setChangesMessage("");
  };

  return (
    <>
      <Card>
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Ready to get started?
            </h3>
            <p className="text-sm text-gray-600">
              Review the contract terms above and choose your response. You have
              7 days to respond.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Button
              className="bg-green-600 hover:bg-green-700"
              onClick={onAccept}
              disabled={isProcessing}
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              {isProcessing ? "Processing..." : "Accept Contract"}
            </Button>

            <Button
              variant="outline"
              onClick={() => setChangesModalOpen(true)}
              disabled={isProcessing}
              className="bg-transparent"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Request Changes
            </Button>

            <Button
              variant="outline"
              onClick={() => setDeclineModalOpen(true)}
              disabled={isProcessing}
              className="text-red-600 hover:text-red-700 border-red-200 hover:bg-red-50 bg-transparent"
            >
              <X className="w-4 h-4 mr-2" />
              Decline
            </Button>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-yellow-900 mb-1">
                  Important Notes
                </h4>
                <ul className="text-sm text-yellow-800 space-y-1">
                  <li>• Accepting this contract creates a binding agreement</li>
                  <li>• You can request changes to terms before accepting</li>
                  <li>• Declining will notify the client immediately</li>
                  <li>• This offer expires in 7 days from when it was sent</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Decline Modal */}
      <Dialog open={declineModalOpen} onOpenChange={setDeclineModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Decline Contract</DialogTitle>
            <DialogDescription>
              Let the client know why you&#39;re declining this contract. This
              helps them understand your decision.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="decline-reason">
                Reason for declining (optional)
              </Label>
              <Textarea
                id="decline-reason"
                placeholder="e.g., Rate doesn't match my expectations, Timeline is too tight, Project scope unclear..."
                value={declineReason}
                onChange={(e) => setDeclineReason(e.target.value)}
                className="mt-1 min-h-[100px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeclineModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDecline}
              disabled={isProcessing}
            >
              {isProcessing ? "Declining..." : "Decline Contract"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Request Changes Modal */}
      <Dialog open={changesModalOpen} onOpenChange={setChangesModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Changes</DialogTitle>
            <DialogDescription>
              Explain what changes you&#39;d like to see in the contract terms.
              The client will be notified and can respond.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="changes-message">
                What changes would you like to request?
              </Label>
              <Textarea
                id="changes-message"
                placeholder="e.g., I'd like to adjust the hourly rate to $X, extend the timeline by X weeks, clarify the project scope..."
                value={changesMessage}
                onChange={(e) => setChangesMessage(e.target.value)}
                className="mt-1 min-h-[120px]"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setChangesModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleRequestChanges}
              disabled={!changesMessage.trim() || isProcessing}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isProcessing ? "Sending..." : "Send Request"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
