import { ProposalProps } from "./proposals";

export interface CreateJobProps {
  title: string;
  description: string;
  experienceLevel: ExperienceLevel;
  jobType: JobType;
  hourlyRateMin?: number;
  hourlyRateMax?: number;
  fixedPrice?: number;
  projectLength: ProjectLength;
  hoursPerWeek: HoursPerWeek;
  jobDuration: JobDuration;
  contractToHire: boolean;
  skills: {
    id: string;
    name: string;
  }[];
}

export interface JobProps {
  id: string;
  title: string;
  category?: string;
  description: string;
  experienceLevel: ExperienceLevel;
  jobType: JobType;
  hourlyRateMin?: number;
  hourlyRateMax?: number;
  fixedPrice?: number;
  projectLength: ProjectLength;
  hoursPerWeek: HoursPerWeek;
  jobDuration: JobDuration;
  contractToHire: boolean;
  skills: {
    id: string;
    name: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface JobDetailProps extends JobProps {
  client: {
    id: string;
    user: {
      fullName: string;
      avatarUrl: string;
      address: string;
      verified: boolean;
    };
  };
  proposals: Omit<ProposalProps, "job">[];
}

export enum ExperienceLevel {
  DEFAULT = "",
  ENTRY = "Entry Level",
  INTERMEDIATE = "Intermediate",
  EXPERT = "Expert",
}

export enum JobType {
  HOURLY = "HOURLY",
  FIXED_PRICE = "FIXED_PRICE",
}

export enum ProjectLength {
  DEFAULT = "",
  LARGE = "Large",
  MEDIUM = "Medium",
  SMALL = "Small",
}

export enum HoursPerWeek {
  DEFAULT = "",
  LESS_THAN_30 = "Less than 30 hrs/week",
  MORE_THAN_30 = "More than 30 hrs/week",
}

export enum JobDuration {
  DEFAULT = "",
  LESS_THAN_ONE_MONTH = "Less than one month",
  ONE_TO_THREE_MONTHS = "1 to 3 months",
  THREE_TO_SIX_MONTHS = "3 to 6 months",
  MORE_THAN_SIX_MONTHS = "More than 6 months",
}
