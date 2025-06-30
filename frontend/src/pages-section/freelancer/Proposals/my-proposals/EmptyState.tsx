"use client";

import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface ProposalsEmptyStateProps {
  onClearFilters: () => void;
}

export function ProposalsEmptyState({
  onClearFilters,
}: ProposalsEmptyStateProps) {
  return (
    <div className="text-center py-12">
      <div className="text-gray-400 mb-4">
        <Search className="w-12 h-12 mx-auto" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        No proposals found
      </h3>
      <p className="text-gray-600 mb-4">
        Try adjusting your filters or search terms.
      </p>
      <Button variant="outline" onClick={onClearFilters}>
        Clear All Filters
      </Button>
    </div>
  );
}
