"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { JobCard } from "@/pages-section/freelancer/find-work/components/JobCard";
import { Pagination } from "@/components/common/Pagination";
import { mockJobs } from "../__mock__/data";

const JOBS_PER_PAGE = 10;

export function JobListings() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);

  const handleSaveJob = (jobId: string) => {
    console.log("Saving job:", jobId);
  };

  const filteredJobs = useMemo(() => {
    let filtered = mockJobs.filter(
      (job) =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort jobs based on selected option
    switch (sortBy) {
      case "oldest":
        filtered = filtered.reverse();
        break;
      case "budget-high":
        filtered = filtered.sort((a, b) => {
          const aPrice =
            Number.parseFloat(a.duration.replace(/[^0-9.]/g, "")) || 0;
          const bPrice =
            Number.parseFloat(b.duration.replace(/[^0-9.]/g, "")) || 0;
          return bPrice - aPrice;
        });
        break;
      case "budget-low":
        filtered = filtered.sort((a, b) => {
          const aPrice =
            Number.parseFloat(a.duration.replace(/[^0-9.]/g, "")) || 0;
          const bPrice =
            Number.parseFloat(b.duration.replace(/[^0-9.]/g, "")) || 0;
          return aPrice - bPrice;
        });
        break;
      default: // newest
        break;
    }

    return filtered;
  }, [searchQuery, sortBy]);

  const totalPages = Math.ceil(filteredJobs.length / JOBS_PER_PAGE);
  const startIndex = (currentPage - 1) * JOBS_PER_PAGE;
  const endIndex = startIndex + JOBS_PER_PAGE;
  const currentJobs = filteredJobs.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Reset to first page when search or sort changes
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-4">
      {/* Search and Sort */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <Select value={sortBy} onValueChange={handleSortChange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="budget-high">Budget: High to Low</SelectItem>
              <SelectItem value="budget-low">Budget: Low to High</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results count */}
      <div className="text-sm text-muted-foreground">
        {filteredJobs.length} jobs found
        {filteredJobs.length > JOBS_PER_PAGE && (
          <span className="ml-2">
            (Showing {startIndex + 1}-{Math.min(endIndex, filteredJobs.length)}{" "}
            of {filteredJobs.length})
          </span>
        )}
      </div>

      {/* Job Cards */}
      <div className="space-y-0">
        {currentJobs.map((job, index) => (
          <JobCard
            key={job.id}
            job={job}
            index={startIndex + index}
            onSaveJob={handleSaveJob}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {/* No results message */}
      {filteredJobs.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            No jobs found matching your search criteria.
          </p>
        </div>
      )}
    </div>
  );
}
