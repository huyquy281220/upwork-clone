import { Card, CardContent, CardHeader } from "@/components/ui/card";
import CirclePencil from "@/components/common/CirclePencil";

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
            {verified && <CirclePencil />}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-green-600">{price}</span>
            <div className="flex gap-1">
              <CirclePencil />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground leading-relaxed">{description}</p>
          <div className="flex gap-1">
            <CirclePencil />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
