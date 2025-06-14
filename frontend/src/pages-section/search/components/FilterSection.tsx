"use client";

import type React from "react";

import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
}

export function FilterSection({
  title,
  children,
  isExpanded,
  onToggle,
}: FilterSectionProps) {
  return (
    <div className="border-b border-border pb-4">
      <Button
        variant="ghost"
        className="w-full justify-between p-0 h-auto font-medium text-foreground hover:bg-transparent"
        onClick={onToggle}
      >
        {title}
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ease-in-out ${
            isExpanded ? "rotate-180" : "rotate-0"
          }`}
        />
      </Button>
      {isExpanded && <div className="mt-3">{children}</div>}
    </div>
  );
}
