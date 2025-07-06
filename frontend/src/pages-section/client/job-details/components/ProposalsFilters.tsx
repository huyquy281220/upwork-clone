"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

interface ProposalsFiltersProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  filterBy: string;
  setFilterBy: (value: string) => void;
}

export function ProposalsFilters({
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
}: ProposalsFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          placeholder="Search proposals..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 w-full h-9 rounded-sm"
        />
      </div>

      <Select value={sortBy} onValueChange={setSortBy}>
        <SelectTrigger className="w-full sm:w-48">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">Newest first</SelectItem>
          <SelectItem value="oldest">Oldest first</SelectItem>
          <SelectItem value="rate-low">Rate: Low to High</SelectItem>
          <SelectItem value="rate-high">Rate: High to Low</SelectItem>
          {/* <SelectItem value="rating">Highest Rated</SelectItem> */}
        </SelectContent>
      </Select>
    </div>
  );
}
