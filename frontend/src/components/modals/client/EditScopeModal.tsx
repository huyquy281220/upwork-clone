"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";

interface ScopeData {
  size: string;
  duration: string;
  level: string;
  contractToHire: string;
}

interface EditScopeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentScope: {
    size: string;
    duration: string;
    level: string;
    type: string;
  };
  onSave: (scope: ScopeData) => void;
}

export function EditScopeModal({
  isOpen,
  onClose,
  currentScope,
  onSave,
}: EditScopeModalProps) {
  const [scope, setScope] = useState<ScopeData>({
    size: currentScope.size,
    duration: currentScope.duration,
    level: currentScope.level,
    contractToHire: currentScope.type.includes("Contract-to-hire")
      ? "yes"
      : "no",
  });

  const handleSave = () => {
    onSave(scope);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-gray-700 text-foreground max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Edit scope
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-8">
          {/* Project Size */}
          <div>
            <h3 className="text-lg font-medium mb-4">Project size</h3>
            <RadioGroup
              value={scope.size}
              onValueChange={(value) => setScope({ ...scope, size: value })}
            >
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <RadioGroupItem value="Large" id="large" className="mt-1" />
                  <div>
                    <label
                      htmlFor="large"
                      className="text-base font-medium cursor-pointer"
                    >
                      Large
                    </label>
                    <p className="text-sm text-gray-400">
                      Longer term or complex initiatives (ex. design and build a
                      full website)
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <RadioGroupItem value="Medium" id="medium" className="mt-1" />
                  <div>
                    <label
                      htmlFor="medium"
                      className="text-base font-medium cursor-pointer"
                    >
                      Medium
                    </label>
                    <p className="text-sm text-gray-400">
                      Well-defined projects (ex. a landing page)
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <RadioGroupItem value="Small" id="small" className="mt-1" />
                  <div>
                    <label
                      htmlFor="small"
                      className="text-base font-medium cursor-pointer"
                    >
                      Small
                    </label>
                    <p className="text-sm text-gray-400">
                      Quick and straightforward tasks (ex. update text and
                      images on a webpage)
                    </p>
                  </div>
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* Duration */}
          <div>
            <h3 className="text-lg font-medium mb-4">
              How long will your work take?
            </h3>
            <RadioGroup
              value={scope.duration}
              onValueChange={(value) => setScope({ ...scope, duration: value })}
            >
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="More than 6 months" id="6plus" />
                  <label htmlFor="6plus" className="text-base cursor-pointer">
                    More than 6 months
                  </label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="3 to 6 months" id="3to6" />
                  <label htmlFor="3to6" className="text-base cursor-pointer">
                    3 to 6 months
                  </label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="1 to 3 months" id="1to3" />
                  <label htmlFor="1to3" className="text-base cursor-pointer">
                    1 to 3 months
                  </label>
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* Experience Level */}
          <div>
            <h3 className="text-lg font-medium mb-2">
              What level of experience will it need?
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              This won&#39;t restrict any proposals, but helps match expertise
              to your budget.
            </p>
            <RadioGroup
              value={scope.level}
              onValueChange={(value) => setScope({ ...scope, level: value })}
            >
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="Expert" id="expert" />
                  <label htmlFor="expert" className="text-base cursor-pointer">
                    Expert
                  </label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="Intermediate" id="intermediate" />
                  <label
                    htmlFor="intermediate"
                    className="text-base cursor-pointer"
                  >
                    Intermediate
                  </label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="Entry" id="entry" />
                  <label htmlFor="entry" className="text-base cursor-pointer">
                    Entry
                  </label>
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* Contract to Hire */}
          <div>
            <h3 className="text-lg font-medium mb-2">
              Is this job a contract-to-hire opportunity?
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              This helps set expectations with talent and won&#39;t restrict who
              can submit proposals.
            </p>
            <RadioGroup
              value={scope.contractToHire}
              onValueChange={(value) =>
                setScope({ ...scope, contractToHire: value })
              }
            >
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <RadioGroupItem value="yes" id="cth-yes" className="mt-1" />
                  <div>
                    <label
                      htmlFor="cth-yes"
                      className="text-base font-medium cursor-pointer"
                    >
                      Yes, this could become full time
                    </label>
                    <p className="text-sm text-gray-400">
                      After a trial period, you can pay a one-time fee to
                      convert the contract.{" "}
                      <span className="text-green-500">Learn more</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="no" id="cth-no" />
                  <label htmlFor="cth-no" className="text-base cursor-pointer">
                    No, not at this time
                  </label>
                </div>
              </div>
            </RadioGroup>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-6">
          <Button
            variant="ghost"
            onClick={onClose}
            className="text-green-500 hover:text-green-400 hover:bg-green-500/10"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            // disabled={isLoading}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            {/* {isLoading ? "Saving..." : saveText} */}
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
