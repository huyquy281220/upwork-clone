import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";
import CirclePencil from "@/components/common/CirclePencil";

interface DraftCardProps {
  title: string;
  description: string;
}

export function DraftCard({ title, description }: DraftCardProps) {
  return (
    <Card className="h-full bg-card border-border">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
            <FileText className="w-5 h-5 text-muted-foreground" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-foreground">{title}</h3>
            <Badge
              variant="secondary"
              className="text-xs mt-1 bg-blue-600/20 text-blue-400 border-blue-600/30"
            >
              <p>Draft job post</p>
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <CirclePencil />
          </div>
        </div>
        <div className="h-[2.5rem] md:h-[6rem]">
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        </div>
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
