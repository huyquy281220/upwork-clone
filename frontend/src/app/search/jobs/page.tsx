import { JobSearchFilters } from "@/pages-section/search/jobs/JobSearchFilter";
import { JobListings } from "@/pages-section/search/jobs/JobsListing";

export default function SearchJobs() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
          {/* Filters Sidebar */}
          <div className="lg:h-fit">
            <JobSearchFilters />
          </div>

          {/* Job Listings */}
          <div className="min-w-0">
            <JobListings />
          </div>
        </div>
      </div>
    </div>
  );
}
