"use client";

import { Button } from "@/components/ui/button";
import CirclePencil from "@/components/common/CirclePencil";

interface SkillsSectionProps {
  skills: string[];
  onEdit?: () => void;
}

export function SkillsSection({ skills, onEdit }: SkillsSectionProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-foreground">Skills</h3>
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
      <div className="text-foreground">
        {skills.length > 0 ? skills.join(", ") : "Add required skills"}
      </div>
    </div>
  );
}
