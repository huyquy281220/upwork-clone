"use client";

import { JobDetails } from "./JobDetails";
import { JobDescription } from "./JobDescription";
import { SkillsSection } from "./SkillsSection";
import { QualificationsSection } from "./Qualifications";
import { ActivitySection } from "./Activity";
import { ClientHistory } from "./ClientHistory";
import { OtherJobs } from "./OtherJobs";
import { useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { JobProps } from "@/types/jobs";

export function JobContent() {
  const queryClient = useQueryClient();
  const params = useParams();
  const jobId = params.jobId as string;

  const jobDetail = queryClient.getQueryData<JobProps>(["job-detail", jobId]);

  if (!jobDetail) return;

  return (
    <div className="space-y-8">
      <JobDetails
        experienceLevel={jobDetail.experienceLevel}
        jobType={jobDetail.jobType}
        fixedPrice={jobDetail.fixedPrice}
        hourlyRateMin={jobDetail.hourlyRateMin}
        hourlyRateMax={jobDetail.hourlyRateMax}
      />
      <JobDescription description={jobDetail.description} />
      <SkillsSection skills={jobDetail.skills} />
      <QualificationsSection />
      <ActivitySection />
      <ClientHistory />
      <OtherJobs />
    </div>
  );
}
