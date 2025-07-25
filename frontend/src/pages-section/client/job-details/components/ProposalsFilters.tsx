"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { Search } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

interface ProposalsFiltersProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  filterBy: string;
  setFilterBy: (value: string) => void;
}

// Constants outside component to prevent re-creation
const SORT_OPTIONS = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "rating", label: "Highest rating" },
  { value: "budget", label: "Budget (high to low)" },
] as const;

const FILTER_OPTIONS = [
  { value: "all", label: "All proposals" },
  { value: "reviewed", label: "Reviewed" },
  { value: "pending", label: "Pending review" },
  { value: "shortlisted", label: "Shortlisted" },
] as const;

export function ProposalsFilters({
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
  filterBy,
  setFilterBy,
}: ProposalsFiltersProps) {
  const [localSearchValue, setLocalSearchValue] = useState(searchQuery);
  const debouncedSearchValue = useDebounce(localSearchValue, 300);

  // Sync debounced value with parent
  const handleDebouncedSearch = useCallback(() => {
    if (debouncedSearchValue !== searchQuery) {
      setSearchQuery(debouncedSearchValue);
    }
  }, [debouncedSearchValue, searchQuery, setSearchQuery]);

  // Use effect replacement with callback
  useMemo(() => {
    handleDebouncedSearch();
  }, [handleDebouncedSearch]);

  // Memoized event handlers
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setLocalSearchValue(e.target.value);
    },
    []
  );

  const handleSortChange = useCallback(
    (value: string) => {
      setSortBy(value);
    },
    [setSortBy]
  );

  const handleFilterChange = useCallback(
    (value: string) => {
      setFilterBy(value);
    },
    [setFilterBy]
  );

  // Memoized select options
  const sortOptions = useMemo(
    () =>
      SORT_OPTIONS.map(({ value, label }) => (
        <SelectItem key={value} value={value}>
          {label}
        </SelectItem>
      )),
    []
  );

  const filterOptions = useMemo(
    () =>
      FILTER_OPTIONS.map(({ value, label }) => (
        <SelectItem key={value} value={value}>
          {label}
        </SelectItem>
      )),
    []
  );

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search proposals..."
          value={localSearchValue}
          onChange={handleSearchChange}
          className="pl-10"
        />
      </div>

      {/* Sort By */}
      <div className="min-w-[180px]">
        <Select value={sortBy} onValueChange={handleSortChange}>
          <SelectTrigger>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>{sortOptions}</SelectContent>
        </Select>
      </div>

      {/* Filter By */}
      <div className="min-w-[180px]">
        <Select value={filterBy} onValueChange={handleFilterChange}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by" />
          </SelectTrigger>
          <SelectContent>{filterOptions}</SelectContent>
        </Select>
      </div>
    </div>
  );
}
