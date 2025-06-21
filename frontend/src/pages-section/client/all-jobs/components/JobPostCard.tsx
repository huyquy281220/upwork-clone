import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface JobPostCardProps {
  title: string;
  createdTime: string;
}

export function JobPostCard({ title, createdTime }: JobPostCardProps) {
  return (
    <div className="bg-muted/30 border border-muted-foreground/20 rounded-lg p-6 hover:bg-muted/50 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="space-y-2 flex-1">
          <h3 className="text-lg font-medium text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">
            Created {createdTime} by You
          </p>
          <p className="text-sm text-muted-foreground"></p>
        </div>

        <div className="flex items-center gap-2 sm:flex-shrink-0">
          <Button
            variant="outline"
            size="sm"
            className="bg-transparent border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
          >
            Edit draft
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="bg-background text-foreground border-muted-foreground/20 hover:bg-muted p-2"
          >
            <Trash2 className="h-4 w-4 text-green-600" />
          </Button>
        </div>
      </div>
    </div>
  );
}
