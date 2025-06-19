"use client";

import { useState, useCallback } from "react";
import type { JobProps } from "@/types";

const initialJobData: JobProps = {
  title: "",
  skills: [],
  experienceLevel: "",
  projectLength: "",
  hoursPerWeek: "",
  jobDuration: "",
  contractToHire: false,
  jobType: "HOURLY",
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
      skills: prev.skills.includes(skill)
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
    const steps = [
      jobData.title.trim().length > 0, // Step 1
      jobData.skills.length >= 1, // Step 2
      jobData.projectLength !== "" &&
        jobData.hoursPerWeek !== "" &&
        jobData.experienceLevel !== "" &&
        jobData.contractToHire !== false, // Step 3
      (jobData.jobType === "HOURLY" &&
        jobData.hourlyRateMin !== undefined &&
        jobData.hourlyRateMax !== undefined &&
        jobData.hourlyRateMin > 0 &&
        jobData.hourlyRateMax > 0 &&
        jobData.hourlyRateMax >= jobData.hourlyRateMin) ||
        (jobData.jobType === "FIXED_PRICE" &&
          jobData.fixedPrice !== undefined &&
          jobData.fixedPrice > 0), // Step 4
      jobData.description.trim().length >= 50, // Step 5
    ];

    const completedSteps = steps.filter(Boolean).length;
    return {
      completedSteps,
      totalSteps: 5,
      percentage: Math.round((completedSteps / 5) * 100),
      isStepComplete: (step: number) => steps[step - 1] || false,
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
