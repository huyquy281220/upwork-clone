"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import CirclePencil from "@/components/common/CirclePencil";
import { useRouter } from "next/navigation";
import { formatRelativeTime } from "@/utils/getRelativeTime";

interface DraftCardProps {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}

export function DraftCard({
  id,
  title,
  description,
  createdAt,
}: DraftCardProps) {
  const router = useRouter();

  return (
    <Card className="h-full bg-card border-border">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
            <FileText className="w-5 h-5 text-muted-foreground" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-foreground">{title}</h3>
            <p className="text-foreground text-[12px] opacity-65">
              {formatRelativeTime(createdAt)}
            </p>
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
          onClick={() => router.push(`/client/job/${id}`)}
        >
          See details
        </Button>
      </CardContent>
    </Card>
  );
}
