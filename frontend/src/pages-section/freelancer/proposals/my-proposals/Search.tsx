"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDebounce } from "@/hooks/useDebounce";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

interface ProposalsSearchSortProps {
  setSearchQuery: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
}

export function ProposalsSearchSort({
  setSearchQuery,
  sortBy,
  setSortBy,
}: ProposalsSearchSortProps) {
  const [searchValue, setSearchValue] = useState("");

  const searchValueDebounced = useDebounce(searchValue, 300);

  useEffect(() => {
    setSearchQuery(searchValueDebounced);
  }, [searchValueDebounced, setSearchQuery]);

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          placeholder="Search proposals..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-full h-9 pl-10 rounded-sm border"
        />
      </div>
      <Select value={sortBy} onValueChange={setSortBy}>
        <SelectTrigger className="w-full sm:w-48">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="newest">Newest</SelectItem>
          <SelectItem value="oldest">Oldest</SelectItem>
          <SelectItem value="highest">Highest Budget</SelectItem>
          <SelectItem value="lowest">Lowest Budget</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
