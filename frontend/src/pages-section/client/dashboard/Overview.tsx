"use client";

import { DraftListItem } from "./components/DraftListItem";
import { Button } from "@/components/ui/button";
import { Grid, List } from "lucide-react";
import { useState } from "react";
import { DraftGridSlider } from "./components/DraftGridSlider";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { JobProps } from "@/types";

export function OverviewSection() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const jobs = queryClient.getQueryData<JobProps[]>(["jobs", session?.user.id]);

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium text-foreground">Overview</h2>
        <div className="flex items-center bg-muted rounded-lg p-1">
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="sm"
            className={`p-2 ${
              viewMode === "grid"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setViewMode("grid")}
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="sm"
            className={`p-2 ${
              viewMode === "list"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setViewMode("list")}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {viewMode === "grid" ? (
        <DraftGridSlider drafts={jobs ?? []} />
      ) : (
        <div className="space-y-0 border border-border rounded-lg overflow-hidden">
          {jobs?.map((job, index) => (
            <DraftListItem
              key={index}
              {...job}
              isLast={index === jobs.length - 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}
