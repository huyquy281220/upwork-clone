import type { JobProps } from "@/types";

export const validateStep1 = (jobData: JobProps): boolean => {
  return jobData.title.trim().length > 0;
};

export const validateStep2 = (jobData: JobProps): boolean => {
  return jobData.skills.length >= 1; // At least 1 skill required
};

export const validateStep3 = (jobData: JobProps): boolean => {
  return (
    jobData.projectLength !== "" &&
    jobData.hoursPerWeek !== "" &&
    jobData.experienceLevel !== "" &&
    jobData.jobDuration !== ""
  );
};

export const validateStep4 = (jobData: JobProps): boolean => {
  if (jobData.jobType === "HOURLY") {
    return (
      jobData.hourlyRateMin !== undefined &&
      jobData.hourlyRateMax !== undefined &&
      jobData.hourlyRateMin > 0 &&
      jobData.hourlyRateMax > 0 &&
      jobData.hourlyRateMax >= jobData.hourlyRateMin
    );
  }

  if (jobData.jobType === "FIXED_PRICE") {
    return jobData.fixedPrice !== undefined && jobData.fixedPrice > 0;
  }

  return false;
};

export const validateStep5 = (jobData: JobProps): boolean => {
  return jobData.description.trim().length >= 50; // Minimum 50 characters for description
};

export const validateCurrentStep = (
  step: number,
  jobData: JobProps
): boolean => {
  switch (step) {
    case 1:
      return validateStep1(jobData);
    case 2:
      return validateStep2(jobData);
    case 3:
      return validateStep3(jobData);
    case 4:
      return validateStep4(jobData);
    case 5:
      return validateStep5(jobData);
    default:
      return false;
  }
};
