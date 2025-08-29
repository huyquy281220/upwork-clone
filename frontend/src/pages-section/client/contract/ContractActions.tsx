"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ContractActionsProps {
  onSaveDraft: () => void;
  onSendContract: () => void;
  isValid: boolean;
  isSending: boolean;
}

export function ContractActions({
  onSaveDraft,
  onSendContract,
  isValid,
  isSending,
}: ContractActionsProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex space-x-3">
          <Button
            variant="outline"
            className="flex-1 bg-transparent"
            onClick={onSaveDraft}
          >
            Back to proposal
          </Button>
          <Button
            className="flex-1 bg-green-600 hover:bg-green-700"
            onClick={onSendContract}
            disabled={!isValid || isSending}
          >
            {isSending ? "Sending..." : "Send Contract"}
          </Button>
        </div>
        <p className="text-xs text-foreground opacity-80 mt-2 text-center">
          The freelancer will receive an email notification and can accept or
          negotiate the terms.
        </p>
      </CardContent>
    </Card>
  );
}
