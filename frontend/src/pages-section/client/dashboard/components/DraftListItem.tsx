import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Languages, List, MoreHorizontal } from "lucide-react";

interface DraftListItemProps {
  title: string;
  status: string;
  description: string;
  icon: string;
  isLast?: boolean;
}

export function DraftListItem({
  title,
  status,
  description,
  icon,
  isLast,
}: DraftListItemProps) {
  const getIcon = () => {
    switch (icon) {
      case "translate":
        return <Languages className="w-5 h-5 text-muted-foreground" />;
      case "list":
        return <List className="w-5 h-5 text-muted-foreground" />;
      default:
        return <List className="w-5 h-5 text-muted-foreground" />;
    }
  };

  return (
    <div
      className={`flex items-center gap-4 p-4 bg-card hover:bg-muted/50 transition-colors ${
        !isLast ? "border-b border-border" : ""
      }`}
    >
      {/* Icon */}
      <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
        {getIcon()}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-1">
          <h3 className="font-medium text-foreground">{title}</h3>
          <Badge
            variant="secondary"
            className="bg-blue-600/20 text-blue-400 border-blue-600/30"
          >
            {status}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <Button
          variant="outline"
          size="sm"
          className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
        >
          Fill in draft
        </Button>
        <Button variant="ghost" size="sm" className="p-2">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
