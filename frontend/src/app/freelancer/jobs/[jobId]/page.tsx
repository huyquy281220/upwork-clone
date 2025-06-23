"use client";

import { LoadingComp } from "@/components/common/LoadingComp";
import {
  JobSidebar,
  JobHeader,
  JobContent,
} from "@/pages-section/freelancer/jobs";
import { getJobById } from "@/services/jobs";
import { JobProps } from "@/types/jobs";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function JobDetailPage() {
  const params = useParams();
  const jobId = params.jobId as string;

  const { data: jobDetail, isLoading } = useQuery<JobProps>({
    queryKey: ["job-detail", jobId],
    queryFn: () => getJobById(jobId),
    enabled: !!jobId,
  });

  if (!jobDetail) return <LoadingComp progress={isLoading ? 50 : 100} />;

  const { title, createdAt } = jobDetail;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
          <div className="lg:col-span-2 order-2 md:order-1 space-y-6">
            <JobHeader title={title} createdAt={createdAt} />
            <JobContent />
          </div>
          <div className="lg:col-span-1 order-1 md:order-2">
            <JobSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
