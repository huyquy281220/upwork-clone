"use client";

import { Button } from "@/components/ui/button";
import type { ExperienceLevel, ProjectLength, JobDuration } from "@/types/jobs";
import CirclePencil from "@/components/common/CirclePencil";

interface ScopeSectionProps {
  projectLength: ProjectLength;
  experienceLevel: ExperienceLevel;
  jobDuration: JobDuration;
  contractToHire: boolean;
  onEdit?: () => void;
}

export function ScopeSection({
  projectLength,
  experienceLevel,
  jobDuration,
  contractToHire,
  onEdit,
}: ScopeSectionProps) {
  const scopeText = [
    projectLength,
    jobDuration,
    experienceLevel,
    contractToHire ? "Contract-to-hire opportunity" : "Contract work",
  ].join(", ");

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-foreground">Scope</h3>
        {onEdit && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onEdit}
            className="text-green-500 hover:bg-transparent"
          >
            <CirclePencil />
          </Button>
        )}
      </div>
      <div className="text-foreground">{scopeText}</div>
    </div>
  );
}
