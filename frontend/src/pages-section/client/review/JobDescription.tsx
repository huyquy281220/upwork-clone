"use client";

import { Button } from "@/components/ui/button";
import CirclePencil from "@/components/common/CirclePencil";

interface JobDescriptionSectionProps {
  description: string;
  onEdit?: () => void;
}

export function JobDescriptionSection({
  description,
  onEdit,
}: JobDescriptionSectionProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="text-foreground">
          {description || "Describe your project in detail..."}
        </div>
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
    </div>
  );
}
