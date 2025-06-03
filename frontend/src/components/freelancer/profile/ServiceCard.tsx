import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Pencil } from "lucide-react";

interface ServiceCardProps {
  title: string;
  price: string;
  description: string;
  verified: boolean;
}

export function ServiceCard({
  title,
  price,
  description,
  verified,
}: ServiceCardProps) {
  return (
    <Card className="relative">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-semibold">{title}</h3>
            {verified && (
              <Pencil className="w-4 h-4 text-green-600 cursor-pointer" />
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-green-600">{price}</span>
            <div className="flex gap-1">
              <Pencil className="w-4 h-4 text-green-600 cursor-pointer" />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground leading-relaxed">{description}</p>
          <div className="flex gap-1">
            <Pencil className="w-4 h-4 text-green-600 cursor-pointer" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
