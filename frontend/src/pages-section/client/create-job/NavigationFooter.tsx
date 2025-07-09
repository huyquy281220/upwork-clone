"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavigationFooterProps {
  currentStep: number;
  onPrevStep: () => void;
  onNextStep: () => void;
  onSubmit: () => void;
  isNextDisabled: boolean;
}

export default function NavigationFooter({
  currentStep,
  onPrevStep,
  onNextStep,
  onSubmit,
  isNextDisabled,
}: NavigationFooterProps) {
  const getNextButtonText = () => {
    switch (currentStep) {
      case 1:
        return "Next: Skills";
      case 2:
        return "Next: Scope";
      case 3:
        return "Next: Budget";
      case 4:
        return "Next: Description";
      case 5:
        return "Post Job";
      default:
        return "Next";
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-gray-700 px-6 py-4">
      <div className="flex justify-between max-w-[100rem] mx-auto">
        <Button
          variant="outline"
          onClick={onPrevStep}
          className="bg-transparent border-gray-600 text-white hover:bg-gray-800"
        >
          Back
        </Button>
        <Button
          onClick={currentStep === 5 ? onSubmit : onNextStep}
          className={cn(
            "bg-green-600 hover:bg-green-700 text-white px-8",
            isNextDisabled && "cursor-not-allowed"
          )}
          disabled={isNextDisabled}
        >
          {getNextButtonText()}
        </Button>
      </div>
    </div>
  );
}
