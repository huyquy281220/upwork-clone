"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useState } from "react";

export function AiPreferenceSection() {
  const [isOptedOut, setIsOptedOut] = useState(true);

  return (
    <div className="bg-background border border-border rounded-lg p-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-foreground mb-2">
          AI preference
        </h2>
        <p className="text-sm text-muted-foreground">
          Choose how your Upwork data is used for AI training and improvement.{" "}
          <a href="#" className="text-green-600 hover:underline">
            Learn more
          </a>
        </p>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <X className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm text-foreground">
          Your data is not being used to train our AI
        </span>
      </div>

      <Button
        variant="outline"
        className="border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
      >
        Change preference
      </Button>
    </div>
  );
}
