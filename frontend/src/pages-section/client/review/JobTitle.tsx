"use client";

import { Button } from "@/components/ui/button";
import CirclePencil from "@/components/common/CirclePencil";

interface JobTitleSectionProps {
  title: string;
  onEdit?: () => void;
}

export function JobTitleSection({ title, onEdit }: JobTitleSectionProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-foreground">Title</h3>
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
      <p className="text-md font-medium text-foreground">{title}</p>
    </div>
  );
}
