"use client";

import { Pagination } from "@/components/common/Pagination";
import { JobPostsHeader } from "@/pages-section/client/all-jobs/JobPostsHeader";
import { JobPostsList } from "@/pages-section/client/all-jobs/JobPostsList";
import { getPaginatedJobs } from "@/services/jobs";
import { JobProps } from "@/types/jobs";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useState } from "react";

interface JobPostsProps {
  data: JobProps[];
  totalPages: number;
}

const LIMIT = 6;

export default function AllJobsPage() {
  const { data: session } = useSession();
  const [currentPage, setCurrentPage] = useState(1);

  const { data: jobPosts } = useQuery<JobPostsProps>({
    queryKey: ["jobs-with-pagination", session?.user.id, currentPage],
    queryFn: () => getPaginatedJobs(session?.user.id ?? "", currentPage, LIMIT),
    enabled: !!session?.user.id,
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="max-w-[80rem] mx-auto">
      <JobPostsHeader />
      <JobPostsList jobPosts={jobPosts?.data ?? []} currentPage={currentPage} />
      <Pagination
        currentPage={currentPage}
        totalPages={jobPosts?.totalPages ?? 1}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
