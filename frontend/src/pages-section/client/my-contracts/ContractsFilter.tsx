"use client";

import { useEffect } from "react";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Filter, X } from "lucide-react";
import useFilter from "@/hooks/useFilter";

interface ContractsFiltersProps {
  onFiltersChange: (filters: {
    search: string;
    status: string;
    contractType: string;
    dateRange: string;
  }) => void;
}

export function ContractsFilters({ onFiltersChange }: ContractsFiltersProps) {
  const { getFilter, setFilter, resetFilters } = useFilter({
    search: "",
    status: "all",
    contractType: "all",
    dateRange: "all",
  });

  // Get current filter values
  const filters = {
    search: getFilter("search"),
    status: getFilter("status"),
    contractType: getFilter("contractType"),
    dateRange: getFilter("dateRange"),
  };

  // Notify parent when filters change
  useEffect(() => {
    onFiltersChange(filters);
  }, [
    filters.search,
    filters.status,
    filters.contractType,
    filters.dateRange,
    onFiltersChange,
  ]);

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    setFilter(key, value);
  };

  const clearFilters = () => {
    resetFilters();
  };

  const hasActiveFilters =
    filters.search ||
    filters.status !== "all" ||
    filters.contractType !== "all" ||
    filters.dateRange !== "all";

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            Filters
          </CardTitle>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <X className="w-4 h-4 mr-1" />
              Clear
            </Button>
          )}
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
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Status Filter */}
        <div>
          <Label htmlFor="status">Status</Label>
          <Select
            value={filters.status}
            onValueChange={(value) => handleFilterChange("status", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="paused">Paused</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Contract Type Filter */}
        <div>
          <Label htmlFor="contractType">Contract Type</Label>
          <Select
            value={filters.contractType}
            onValueChange={(value) => handleFilterChange("contractType", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="fixedprice">Fixed Price</SelectItem>
              <SelectItem value="hourly">Hourly</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Date Range Filter */}
        <div>
          <Label htmlFor="dateRange">Date Range</Label>
          <Select
            value={filters.dateRange}
            onValueChange={(value) => handleFilterChange("dateRange", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="week">Last Week</SelectItem>
              <SelectItem value="month">Last Month</SelectItem>
              <SelectItem value="quarter">Last Quarter</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
