"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import CirclePencil from "@/components/common/CirclePencil";

interface ServiceCardProps {
  title: string;
  price: string;
  description: string;
  onEditTitle: () => void;
  onEditRate: () => void;
  onEditOverview: () => void;
}

export function ServiceCard({
  title,
  price,
  description,
  onEditTitle,
  onEditRate,
  onEditOverview,
}: ServiceCardProps) {
  return (
    <Card className="relative">
      <CardHeader className="pb-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-semibold">{title}</h3>
            {/* {verified && <CirclePencil />} */}
            <CirclePencil onEdit={onEditTitle} />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-foreground">
              ${Number(price).toFixed(2)}/hr
            </span>
            <div className="flex gap-1">
              <CirclePencil onEdit={onEditRate} />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <p className="text-foreground leading-relaxed">{description}</p>
          <div className="flex gap-1">
            <CirclePencil onEdit={onEditOverview} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
