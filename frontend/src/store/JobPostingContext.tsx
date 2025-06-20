"use client";

import { useJobPosting } from "@/hooks/useJobPosting";
import { createContext, useContext } from "react";

type JobPostingContextType = ReturnType<typeof useJobPosting>;

const JobPostingContext = createContext<JobPostingContextType | undefined>(
  undefined
);

export const JobPostingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const {
    jobData,
    updateJobData,
    resetJobData,
    addSkill,
    removeSkill,
    submitJob,
    getFormProgress,
  } = useJobPosting();

  return (
    <JobPostingContext.Provider
      value={{
        jobData,
        updateJobData,
        resetJobData,
        addSkill,
        removeSkill,
        submitJob,
        getFormProgress,
      }}
    >
      {children}
    </JobPostingContext.Provider>
  );
};

export const useJobPostingContext = () => {
  const context = useContext(JobPostingContext);
  if (!context) {
    throw new Error(
      "useJobPostingContext must be used within a JobPostingProvider"
    );
  }
  return context;
};
