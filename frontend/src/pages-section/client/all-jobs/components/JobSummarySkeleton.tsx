import { Skeleton } from "@/components/ui/skeleton";

export function JobSummarySkeleton() {
  return (
    <div className="bg-muted/30 border border-muted-foreground/20 rounded-lg p-6 hover:bg-muted/50 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="space-y-2 flex-1">
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>

        <div className="flex items-center gap-2 sm:flex-shrink-0">
          <Skeleton />
          <Skeleton />
        </div>
      </div>
    </div>
  );
}
