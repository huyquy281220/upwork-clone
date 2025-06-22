"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  ExperienceLevel,
  ProjectLength,
  HoursPerWeek,
  JobDuration,
} from "@/types/jobs";
import { Button } from "@/components/ui/button";

interface ScopeData {
  projectLength: ProjectLength;
  experienceLevel: ExperienceLevel;
  hoursPerWeek: HoursPerWeek;
  jobDuration: JobDuration;
  contractToHire: boolean;
}

interface EditScopeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentScope: ScopeData;
  onSave: (scope: ScopeData) => void;
}

export function EditScopeModal({
  isOpen,
  onClose,
  currentScope,
  onSave,
}: EditScopeModalProps) {
  const [scope, setScope] = useState<ScopeData>(currentScope);

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
          {/* Project Length */}
          <div>
            <h3 className="text-lg font-medium mb-4">Project size</h3>
            <RadioGroup
              value={scope.projectLength}
              onValueChange={(value) =>
                setScope({ ...scope, projectLength: value as ProjectLength })
              }
            >
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <RadioGroupItem
                    value={ProjectLength.LARGE}
                    id="Large"
                    className="mt-1"
                  />
                  <div>
                    <label
                      htmlFor="Large"
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
                  <RadioGroupItem
                    value={ProjectLength.MEDIUM}
                    id="Medium"
                    className="mt-1"
                  />
                  <div>
                    <label
                      htmlFor="Medium"
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
                  <RadioGroupItem
                    value={ProjectLength.SMALL}
                    id="Small"
                    className="mt-1"
                  />
                  <div>
                    <label
                      htmlFor="Small"
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

          {/* Job Duration */}
          <div>
            <h3 className="text-lg font-medium mb-4">
              How long will your work take?
            </h3>
            <RadioGroup
              value={scope.jobDuration}
              onValueChange={(value) =>
                setScope({ ...scope, jobDuration: value as JobDuration })
              }
            >
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <RadioGroupItem
                    value={JobDuration.MORE_THAN_SIX_MONTHS}
                    id="6plus"
                  />
                  <label htmlFor="6plus" className="text-base cursor-pointer">
                    More than 6 months
                  </label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem
                    value={JobDuration.THREE_TO_SIX_MONTHS}
                    id="3to6"
                  />
                  <label htmlFor="3to6" className="text-base cursor-pointer">
                    3 to 6 months
                  </label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem
                    value={JobDuration.ONE_TO_THREE_MONTHS}
                    id="1to3"
                  />
                  <label htmlFor="1to3" className="text-base cursor-pointer">
                    1 to 3 months
                  </label>
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* Hours Per Week */}
          <div>
            <h3 className="text-lg font-medium mb-4">
              How many hours per week?
            </h3>
            <RadioGroup
              value={scope.hoursPerWeek}
              onValueChange={(value) =>
                setScope({ ...scope, hoursPerWeek: value as HoursPerWeek })
              }
            >
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <RadioGroupItem
                    value={HoursPerWeek.MORE_THAN_30}
                    id="More than 30 hrs/week"
                  />
                  <label
                    htmlFor="More than 30 hrs/week"
                    className="text-base cursor-pointer"
                  >
                    More than 30 hrs/week
                  </label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem
                    value={HoursPerWeek.LESS_THAN_30}
                    id="Less than 30 hrs/week"
                  />
                  <label
                    htmlFor="Less than 30 hrs/week"
                    className="text-base cursor-pointer"
                  >
                    Less than 30 hrs/week
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
              value={scope.experienceLevel}
              onValueChange={(value) =>
                setScope({
                  ...scope,
                  experienceLevel: value as ExperienceLevel,
                })
              }
            >
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value={ExperienceLevel.EXPERT} id="Expert" />
                  <label htmlFor="Expert" className="text-base cursor-pointer">
                    Expert
                  </label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem
                    value={ExperienceLevel.INTERMEDIATE}
                    id="Intermediate"
                  />
                  <label
                    htmlFor="Intermediate"
                    className="text-base cursor-pointer"
                  >
                    Intermediate
                  </label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value={ExperienceLevel.ENTRY} id="Entry" />
                  <label htmlFor="Entry" className="text-base cursor-pointer">
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
              value={scope.contractToHire ? "yes" : "no"}
              onValueChange={(value) =>
                setScope({ ...scope, contractToHire: value === "yes" })
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
