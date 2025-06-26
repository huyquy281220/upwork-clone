"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface SubmitSectionProps {
  onSubmit: () => void;
  isSubmitting: boolean;
  isValid: boolean;
}

export function SubmitSection({
  onSubmit,
  isSubmitting,
  isValid,
}: SubmitSectionProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex space-x-3">
          <Button variant="outline" className="flex-1" asChild>
            <a href="/best-matches">Cancel</a>
          </Button>
          <Button
            className="flex-1 bg-green-600 hover:bg-green-700"
            onClick={onSubmit}
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Proposal"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
