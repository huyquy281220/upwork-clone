"use client";

import { Search } from "lucide-react";

export function ProposalsEmptyState() {
  return (
    <div className="text-center py-12">
      <div className="text-gray-400 mb-4">
        <Search className="w-12 h-12 mx-auto" />
      </div>
      <h3 className="text-lg font-medium text-foreground mb-2">
        No proposals found
      </h3>
      <p className="text-gray-600 mb-4">
        Try adjusting your filters or search terms.
      </p>
    </div>
  );
}
