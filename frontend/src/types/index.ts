export interface PageProps {
  children: React.ReactNode;
}

export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  country: string;
  emailUpdates: boolean;
  agreeTerms: boolean;
}

export interface Country {
  name: { common: string };
  cca2: string;
  flags: { png: string };
}

export type ChildrenProps = {
  children: React.ReactNode;
};

export interface NavMenuItemProps {
  title: string;
  menu: {
    label: string;
    link?: string;
    type?: string;
  };
}

export interface JobProps {
  title: string;
  description: string;
  // category: string;
  experienceLevel: ExperienceLevel;
  jobType: JobType;
  hourlyRateMin?: number;
  hourlyRateMax?: number;
  fixedPrice?: number;
  projectLength: ProjectLength;
  hoursPerWeek: HoursPerWeek;
  jobDuration: JobDuration;
  contractToHire: boolean;
  skills: string[];
}

export interface Skill {
  id: string;
  name: string;
  categoryName: string;
}

export interface StepProps {
  jobData: JobProps;
  updateJobData: (updates: Partial<JobProps>) => void;
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
