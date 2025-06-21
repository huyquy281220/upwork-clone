"use client";

import { Pagination } from "@/components/common/Pagination";
import { JobPostsHeader } from "@/pages-section/client/all-jobs/JobPostsHeader";
import { JobPostsList } from "@/pages-section/client/all-jobs/JobPostsList";
import { getAllJobsByUserId } from "@/services/jobs";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function AllJobsPage() {
  const { data: session } = useSession();

  const { data: jobPosts } = useQuery({
    queryKey: ["jobs", session?.user.id],
    queryFn: () => getAllJobsByUserId(session?.user.id ?? ""),
    enabled: !!session?.user.id,
  });

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="max-w-[80rem] mx-auto">
      <JobPostsHeader />
      <JobPostsList jobPosts={jobPosts ?? []} />
      <Pagination
        currentPage={currentPage}
        totalPages={10}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
