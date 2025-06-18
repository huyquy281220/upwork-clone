import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ResourceCardProps {
  category: string;
  title: string;
  buttonText: string;
  image: string;
}

export function ResourceCard({
  category,
  title,
  buttonText,
  image,
}: ResourceCardProps) {
  return (
    <Card className="bg-card border-border">
      <CardContent className="p-6 space-y-4">
        <Badge variant="secondary" className="text-xs">
          {category}
        </Badge>

        <h3 className="font-medium text-foreground leading-tight">{title}</h3>

        <div className="flex items-end justify-between">
          <Button variant="outline" size="sm">
            {buttonText}
          </Button>
          <div className="w-16 h-16 flex items-center justify-center text-2xl">
            {image.includes("🚀") && "🚀"}
            {image.includes("📋") && "📋"}
            {image.includes("💬") && "💬"}
            {image.includes("✅") && "✅"}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
