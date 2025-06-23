import { Heart, Flag } from "lucide-react";

export function JobActions() {
  return (
    <div className="space-y-2">
      <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground w-full text-left">
        <Heart className="w-4 h-4" />
        Save job
      </button>
      <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground w-full text-left">
        <Flag className="w-4 h-4" />
        Flag as inappropriate
      </button>
    </div>
  );
}
