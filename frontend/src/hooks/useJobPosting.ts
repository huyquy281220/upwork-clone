"use client";

import { useState, useCallback } from "react";
import {
  JobDuration,
  ExperienceLevel,
  HoursPerWeek,
  JobType,
  ProjectLength,
  type JobProps,
} from "@/types";

const initialJobData: JobProps = {
  title: "",
  skills: [],
  experienceLevel: ExperienceLevel.DEFAULT,
  projectLength: ProjectLength.DEFAULT,
  hoursPerWeek: HoursPerWeek.DEFAULT,
  jobDuration: JobDuration.DEFAULT,
  contractToHire: false,
  jobType: JobType.HOURLY,
  hourlyRateMin: 0,
  hourlyRateMax: 0,
  fixedPrice: 0,
  description: "",
};

export function useJobPosting() {
  const [jobData, setJobData] = useState<JobProps>(initialJobData);

  // Update job data
  const updateJobData = useCallback((updates: Partial<JobProps>) => {
    setJobData((prev) => ({ ...prev, ...updates }));
  }, []);

  // Reset form data
  const resetJobData = useCallback(() => {
    setJobData(initialJobData);
  }, []);

  // Skill management
  const addSkill = useCallback((skill: string) => {
    setJobData((prev) => ({
      ...prev,
      skills: prev.skills.some((s) => s === skill)
        ? prev.skills
        : [...prev.skills, skill],
    }));
  }, []);

  const removeSkill = useCallback((skill: string) => {
    setJobData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }));
  }, []);

  // Form submission
  const submitJob = useCallback(() => {
    console.log("Submitting job:", jobData);
    // Here you would typically send data to your API
    alert("Job posted successfully!");
    return jobData;
  }, [jobData]);

  // Get form completion status
  const getFormProgress = useCallback(() => {
    const stepValidations = [
      // Step 1: Title validation
      () => jobData.title.trim().length > 0,

      // Step 2: Skills validation
      () => jobData.skills.length >= 1,

      // Step 3: Scope validation
      () => {
        const { projectLength, hoursPerWeek, experienceLevel } = jobData;
        return projectLength && hoursPerWeek && experienceLevel;
      },

      // Step 4: Budget validation
      () => {
        const { jobType, hourlyRateMin, hourlyRateMax, fixedPrice } = jobData;

        if (jobType === JobType.HOURLY) {
          return (
            (hourlyRateMin ?? 0) > 0 &&
            (hourlyRateMax ?? 0) > 0 &&
            (hourlyRateMax ?? 0) >= (hourlyRateMin ?? 0)
          );
        }
        if (jobType === JobType.FIXED_PRICE) {
          return (fixedPrice ?? 0) > 0;
        }

        return false;
      },

      // Step 5: Description validation
      () => jobData.description.trim().length >= 50,
    ];

    const completedSteps = stepValidations.filter((validator) =>
      validator()
    ).length;
    const totalSteps = stepValidations.length;

    return {
      completedSteps,
      totalSteps,
      percentage: Math.round((completedSteps / totalSteps) * 100),
      isStepComplete: (step: number) => stepValidations[step - 1]?.() || false,
    };
  }, [jobData]);

  return {
    // State
    jobData,

    // Actions
    updateJobData,
    resetJobData,
    addSkill,
    removeSkill,
    submitJob,

    // Computed
    getFormProgress,
  };
}
