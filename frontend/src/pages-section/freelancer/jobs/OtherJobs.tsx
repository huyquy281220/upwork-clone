"use client";

import { InfiniteLoading } from "@/components/common/InfiniteLoading";
import { getPaginatedJobs } from "@/services/jobs";
import { JobProps, JobType } from "@/types/jobs";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

const INITIAL_LIMIT = 5;
const PAGE = 1;

type PaginatedJobsProps = {
  data: JobProps[];
  totalPages: number;
};

export function OtherJobs({
  clientId,
  selectedJobId,
}: {
  clientId: string;
  selectedJobId: string;
}) {
  const router = useRouter();
  const [limit, setLimit] = useState<number>(INITIAL_LIMIT);
  const [expanded, setExpanded] = useState<boolean>(false);

  const { data: paginatedJobs, isLoading } = useQuery<PaginatedJobsProps>({
    queryKey: ["jobs-with-pagination", clientId, limit],
    queryFn: () => getPaginatedJobs(clientId, PAGE, limit),
  });

  const otherJobs = paginatedJobs?.data.filter(
    (job) => job.id !== selectedJobId
  );

  const totalCount = otherJobs?.length || 0;

  if (isLoading) return <InfiniteLoading />;

  return (
    <div className="space-y-4 border-t border-gray-200 pt-4">
      <h3 className="text-lg font-semibold text-foreground">
        Other open jobs by this Client{` (${totalCount})`}
      </h3>
      <div className="space-y-2">
        {otherJobs?.slice(0, INITIAL_LIMIT).map((job, index) => (
          <div
            key={index}
            className="text-green-500 hover:underline cursor-pointer"
            onClick={() => {
              router.push(`/jobs/${job.id}`);
            }}
          >
            {job.title}
            {" - "}
            <span className="text-[#a5a5a5]">
              {job.jobType === JobType.FIXED_PRICE ? "Fixed-price" : "Hourly"}
            </span>
          </div>
        ))}
      </div>
      {!expanded && totalCount > INITIAL_LIMIT && (
        <div>
          <button
            className="text-green-500 hover:underline cursor-pointer"
            onClick={() => {
              setLimit(INITIAL_LIMIT + (totalCount - INITIAL_LIMIT));
              setExpanded(true);
            }}
          >
            {`View more ( ${totalCount - INITIAL_LIMIT} )`}
          </button>
        </div>
      )}
    </div>
  );
}
