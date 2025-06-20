"use client";

import { DraftListItem } from "./components/DraftListItem";
import { Button } from "@/components/ui/button";
import { Grid, List } from "lucide-react";
import { useState } from "react";
import { DraftGridSlider } from "./components/DraftGridSlider";

const drafts = [
  {
    id: 1,
    title: "Test2",
    status: "Draft job post",
    description: "Add details to your draft",
    icon: "translate",
  },
  {
    id: 2,
    title: "Test",
    status: "Draft job post",
    description: "Add details to your draft",
    icon: "list",
  },
  {
    id: 3,
    title: "Test",
    status: "Draft job post",
    description: "Add details to your draft",
    icon: "list",
  },
  {
    id: 4,
    title: "Test",
    status: "Draft job post",
    description: "Add details to your draft",
    icon: "list",
  },
];

export function OverviewSection() {
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
        <DraftGridSlider drafts={drafts} />
      ) : (
        <div className="space-y-0 border border-border rounded-lg overflow-hidden">
          {drafts.map((draft, index) => (
            <DraftListItem
              key={draft.id}
              {...draft}
              isLast={index === drafts.length - 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}
