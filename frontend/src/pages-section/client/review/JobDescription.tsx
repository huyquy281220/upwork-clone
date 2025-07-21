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
      <div className="mb-4 space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-foreground">Description</h3>
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
        <p className="text-foreground line-clamp-3">{description}</p>
      </div>
    </div>
  );
}
