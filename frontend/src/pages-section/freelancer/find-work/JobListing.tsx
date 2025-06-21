"use client";

import { JobCard } from "@/pages-section/freelancer/find-work/components/JobCard";
import { jobsData } from "./__mock__/jobs";
import { JobSearch } from "./JobSearch";
import { JobFilters } from "@/pages-section/freelancer/find-work/components/JobFilters";
import { useState } from "react";
import { parsePostedTime } from "@/utils/parsePostedTime";
import type { JobProps } from "@/types/jobs";

const filterTabs = [
  { id: "best-matches", label: "Best Matches" },
  { id: "most-recent", label: "Most Recent" },
  { id: "saved-jobs", label: "Saved Jobs" },
];

export function JobListing() {
  const [activeTab, setActiveTab] = useState("best-matches");
  const [savedJobs, setSavedJobs] = useState<JobProps[]>([]);

  const recentJobs = [...jobsData].sort((a, b) => {
    const timeA = parsePostedTime(a.postedTime);
    const timeB = parsePostedTime(b.postedTime);
    return timeB.getTime() - timeA.getTime();
  });

  const handleSaveJob = (jobId: string) => {
    const jobSaved = jobsData.find((job) => job.id === jobId);
    console.log(jobSaved);
    if (!jobSaved) return;

    setSavedJobs((prev) => {
      const isAlreadySaved = prev.some((job) => job.id === jobId);

      if (isAlreadySaved) {
        return prev.filter((job) => job.id !== jobId);
      }

      return [...prev, jobSaved];
    });
  };

  let usedJobs: JobProps[] = [];

  switch (activeTab) {
    case "best-matches":
      usedJobs = jobsData;
      break;
    case "most-recent":
      usedJobs = recentJobs;
      break;
    case "saved-jobs":
      usedJobs = savedJobs;
      break;
    default:
      break;
  }

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
        {usedJobs.map((job, index) => (
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
