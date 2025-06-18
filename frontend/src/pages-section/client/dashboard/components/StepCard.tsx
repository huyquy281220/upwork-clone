import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface StepCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  status: "required" | "completed";
  actionText: string;
}

export function StepCard({
  title,
  description,
  icon: Icon,
  status,
  actionText,
}: StepCardProps) {
  return (
    <Card className="bg-card border-border">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            {status === "completed" ? (
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                <Check className="w-6 h-6 text-foreground" />
              </div>
            ) : (
              <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                <Icon className="w-6 h-6 text-muted-foreground" />
              </div>
            )}
          </div>
          <div className="flex-1 space-y-2">
            <Badge variant="secondary" className="text-xs bg-background">
              {actionText}
            </Badge>
            <h3 className="font-medium text-foreground underline cursor-pointer hover:no-underline">
              {title}
            </h3>
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
            {status === "completed" && (
              <div className="flex items-center gap-2 text-sm text-green-600">
                <Check className="w-4 h-4" />
                Email address verified
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
