"use client";

import { Pagination } from "@/components/common/Pagination";
import { JobPostsHeader } from "@/pages-section/client/all-jobs/JobPostsHeader";
import { JobPostsList } from "@/pages-section/client/all-jobs/JobPostsList";
import { JobProps } from "@/types/jobs";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function AllJobsPage() {
  const queryClient = useQueryClient();
  const jobsPosted = queryClient.getQueryData<JobProps[]>(["jobs"]);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="max-w-[80rem] mx-auto">
      <JobPostsHeader />
      <JobPostsList jobPosts={jobsPosted ?? []} />
      <Pagination
        currentPage={currentPage}
        totalPages={10}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
