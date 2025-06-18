import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Languages, List } from "lucide-react";

interface DraftCardProps {
  title: string;
  status: string;
  description: string;
  icon?: string;
}

export function DraftCard({
  title,
  status,
  description,
  icon,
}: DraftCardProps) {
  const getIcon = () => {
    switch (icon) {
      case "translate":
        return <Languages className="w-5 h-5 text-muted-foreground" />;
      case "list":
        return <List className="w-5 h-5 text-muted-foreground" />;
      default:
        return <FileText className="w-5 h-5 text-muted-foreground" />;
    }
  };

  return (
    <Card className="bg-card border-border">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
            {getIcon()}
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-foreground">{title}</h3>
            <Badge
              variant="secondary"
              className="text-xs mt-1 bg-blue-600/20 text-blue-400 border-blue-600/30"
            >
              {status}
            </Badge>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
        <Button
          variant="outline"
          className="w-full border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
        >
          Fill in draft
        </Button>
      </CardContent>
    </Card>
  );
}
