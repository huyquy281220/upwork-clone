"use client";

import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { JobProps } from "@/types/jobs";
import CirclePencil from "@/components/common/CirclePencil";
import { useRouter } from "next/navigation";
import { formatRelativeTime } from "@/utils/getRelativeTime";

export function DraftListItem({
  id,
  title,
  description,
  isLast,
  createdAt,
}: JobProps & { isLast: boolean }) {
  const router = useRouter();

  return (
    <div
      className={`flex items-center gap-4 p-4 bg-card hover:bg-muted/50 transition-colors border-b border-border ${
        isLast ? "border-b-0" : ""
      }`}
    >
      {/* Icon */}
      <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
        <FileText className="w-5 h-5 text-muted-foreground" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-1">
          <h3 className="font-medium text-foreground">{title}</h3>
          <p className="text-foreground text-[12px] opacity-65">
            ( {formatRelativeTime(createdAt)} )
          </p>
        </div>
        <p className="max-w-96 text-muted-foreground line-clamp-1">
          {description}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <Button
          variant="outline"
          size="sm"
          className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
          onClick={() => router.push(`/client/job/${id}`)}
        >
          See details
        </Button>
        <CirclePencil
          onEdit={() => router.push(`/client/job-post/review/${id}`)}
        />
      </div>
    </div>
  );
}
