"use client";

import { JobCard } from "@/pages-section/freelancer/find-work/components/JobCard";
import { JobSearch } from "./JobSearch";
import { JobFilters } from "@/pages-section/freelancer/find-work/components/JobFilters";
import { useCallback, useMemo, useState } from "react";
import type { JobProps } from "@/types/jobs";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useUser } from "@/hooks/useUserInfo";
import { getBestMatchesJobs, getMostRecentJobs } from "@/services/jobs";
import { FreelancerUser } from "@/types/user";

const filterTabs = [
  { id: "best-matches", label: "Best Matches" },
  { id: "most-recent", label: "Most Recent" },
  { id: "saved-jobs", label: "Saved Jobs" },
];

export function JobListing() {
  const { data: session } = useSession();
  const { data: freelancer } = useUser<FreelancerUser>(session?.user.id ?? "");
  const freelancerId = freelancer?.freelancerProfile.id;

  const [activeTab, setActiveTab] = useState("best-matches");
  const [savedJobs, setSavedJobs] = useState<JobProps[]>([]);

  const { data: bestMatchesJobs } = useQuery({
    queryKey: ["best-matches-jobs"],
    queryFn: () => getBestMatchesJobs(freelancerId ?? ""),
    enabled: !!freelancerId,
  });

  const { data: mostRecentJobs } = useQuery({
    queryKey: ["most-recent-jobs"],
    queryFn: () => getMostRecentJobs(),
  });

  const usedJobs: JobProps[] = useMemo(() => {
    switch (activeTab) {
      case "best-matches":
        return bestMatchesJobs ?? [];
      case "most-recent":
        return mostRecentJobs ?? [];
      case "saved-jobs":
        return savedJobs;
      default:
        return [];
    }
  }, [activeTab, bestMatchesJobs, mostRecentJobs, savedJobs]);

  console.log(bestMatchesJobs);
  const handleSaveJob = useCallback(
    (jobId: string) => {
      const jobSaved = usedJobs.find((job) => job.id === jobId);
      console.log(jobSaved);
      if (!jobSaved) return;

      setSavedJobs((prev) => {
        const isAlreadySaved = prev.some((job) => job.id === jobId);

        if (isAlreadySaved) {
          return prev.filter((job) => job.id !== jobId);
        }

        return [...prev, jobSaved];
      });
    },
    [usedJobs]
  );

  return (
    <div>
      <div className="mb-6">
        <JobSearch />
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Jobs you might like</h2>
        <JobFilters
          filterTabs={filterTabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          savedJobs={savedJobs.length}
        />
        <p className="text-sm text-gray-600 mt-4 mb-6">
          Browse jobs that match your experience to a client&#39;s hiring
          preferences. Ordered by most relevant.
        </p>
      </div>

      <div>
        {usedJobs?.map((job, index) => (
          <JobCard
            key={job.id}
            job={job}
            index={index}
            onSaveJob={handleSaveJob}
          />
        ))}
      </div>
    </div>
  );
}
