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
import { JobWithStatsProps } from "@/types/jobs";

export function JobContent() {
  const queryClient = useQueryClient();
  const params = useParams();
  const jobId = params.jobId as string;

  const jobWithStats = queryClient.getQueryData<JobWithStatsProps>([
    "job-detail",
    jobId,
  ]);

  const jobDetail = jobWithStats?.job;

  if (!jobDetail || !jobWithStats) return;

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
      <ActivitySection
        proposals={jobDetail.proposals.length}
        interviewing={0}
        invitesSent={0}
        unansweredInvites={0}
      />
      <ClientHistory />
      <OtherJobs clientId={jobDetail.client.user.id} />
    </div>
  );
}
