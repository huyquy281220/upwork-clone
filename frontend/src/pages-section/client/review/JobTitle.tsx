"use client";

import { Button } from "@/components/ui/button";
import CirclePencil from "@/components/common/CirclePencil";

interface JobTitleSectionProps {
  title: string;
  onEdit?: () => void;
}

export function JobTitleSection({ title, onEdit }: JobTitleSectionProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-foreground">
          {title || "Enter your job title"}
        </h3>
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
