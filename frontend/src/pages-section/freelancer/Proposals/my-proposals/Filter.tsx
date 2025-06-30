"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter } from "lucide-react";

interface ProposalsFiltersProps {
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  dateFilter: string;
  setDateFilter: (value: string) => void;
  budgetRangeFilter: string;
  setBudgetRangeFilter: (value: string) => void;
  statusCounts: {
    active: number;
    interviewing: number;
    submitted: number;
    declined: number;
  };
  filteredCount: number;
  onClearFilters: () => void;
}

export function ProposalsFilters({
  statusFilter,
  setStatusFilter,
  dateFilter,
  setDateFilter,
  budgetRangeFilter,
  setBudgetRangeFilter,
  statusCounts,
  filteredCount,
  onClearFilters,
}: ProposalsFiltersProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4" />
          <span className="font-medium">Filters</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Status
          </label>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                All Proposals ({filteredCount})
              </SelectItem>
              <SelectItem value="active">
                Active ({statusCounts.active})
              </SelectItem>
              <SelectItem value="interviewing">
                Interviewing ({statusCounts.interviewing})
              </SelectItem>
              <SelectItem value="submitted">
                Submitted ({statusCounts.submitted})
              </SelectItem>
              <SelectItem value="declined">
                Declined ({statusCounts.declined})
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Date Range
          </label>
          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All time</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">Past week</SelectItem>
              <SelectItem value="month">Past month</SelectItem>
              <SelectItem value="quarter">Past 3 months</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Budget Range
          </label>
          <Select
            value={budgetRangeFilter}
            onValueChange={setBudgetRangeFilter}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any budget</SelectItem>
              <SelectItem value="under-1k">Under $1,000</SelectItem>
              <SelectItem value="1k-5k">$1,000 - $5,000</SelectItem>
              <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
              <SelectItem value="over-10k">$10,000+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="pt-4 border-t">
          <Button
            variant="outline"
            size="sm"
            className="w-full bg-transparent"
            onClick={onClearFilters}
          >
            Clear All Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
