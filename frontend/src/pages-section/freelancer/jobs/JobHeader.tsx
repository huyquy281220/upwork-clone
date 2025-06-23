import { formatRelativeTime } from "@/utils/getRelativeTime";
import { Clock, MapPin, AlertTriangle } from "lucide-react";

interface JobHeaderProps {
  title: string;
  createdAt: string;
}

export function JobHeader({ title, createdAt }: JobHeaderProps) {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl md:text-3xl font-bold text-foreground">
        {title}
      </h1>

      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>Posted {formatRelativeTime(createdAt)}</span>
        </div>
        <div className="flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          <span>Worldwide</span>
        </div>
      </div>

      <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg border-l-4 border-yellow-500">
        <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
        <div className="text-sm">
          <span className="text-foreground">
            Specialized profiles can help you better highlight your expertise
            when submitting proposals to jobs like these.
          </span>
          <span className="text-green-500 ml-1 underline cursor-pointer">
            Create a specialized profile.
          </span>
        </div>
      </div>
    </div>
  );
}
