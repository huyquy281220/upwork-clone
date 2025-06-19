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
  experienceLevel: string;
  jobType: "FIXED_PRICE" | "HOURLY";
  hourlyRateMin?: number;
  hourlyRateMax?: number;
  fixedPrice?: number;
  projectLength: string;
  hoursPerWeek: string;
  jobDuration: string;
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
