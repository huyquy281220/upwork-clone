"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Search, Filter } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import { useState } from "react";

interface ContractsFiltersProps {
  onFiltersChange: (key: string, value: string) => void;
  resetFilters: () => void;
  status: string;
  contractType: string;
  dateRange: string;
}

export function ContractsFilters({
  onFiltersChange,
  resetFilters,
  status,
  contractType,
  dateRange,
}: ContractsFiltersProps) {
  const [searchValue, setSearchValue] = useState("");
  const debouncedValue = useDebounce(searchValue, 500);

  const clearFilters = () => {
    resetFilters();
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
    onFiltersChange("search", debouncedValue);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            Filters
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search */}
        <div>
          <Label htmlFor="search">Search</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              id="search"
              placeholder="Search contracts..."
              value={searchValue}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Status Filter */}
        <div>
          <Label htmlFor="status">Status</Label>
          <Select
            value={status}
            onValueChange={(value) => onFiltersChange("status", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              {/* <SelectItem value="paused">Paused</SelectItem> */}
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Contract Type Filter */}
        <div>
          <Label htmlFor="contractType">Contract Type</Label>
          <Select
            value={contractType}
            onValueChange={(value) => onFiltersChange("contractType", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="fixed_price">Fixed Price</SelectItem>
              <SelectItem value="hourly">Hourly</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Date Range Filter */}
        <div>
          <Label htmlFor="dateRange">Date Range</Label>
          <Select
            value={dateRange}
            onValueChange={(value) => onFiltersChange("dateRange", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">Last Week</SelectItem>
              <SelectItem value="month">Last Month</SelectItem>
              <SelectItem value="quarter">Last Quarter</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          size="sm"
          className="w-full bg-transparent"
          onClick={clearFilters}
        >
          Clear All Filters
        </Button>
      </CardFooter>
    </Card>
  );
}
