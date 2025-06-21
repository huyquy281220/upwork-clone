import { CreateJobProps } from "./jobs";

export interface PageProps {
  children: React.ReactNode;
}

export interface ToastProps {
  title: string;
  description?: string;
  duration?: number;
  position?:
    | "top-left"
    | "top-right"
    | "top-center"
    | "bottom-left"
    | "bottom-right"
    | "bottom-center";
  type?: "success" | "error";
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

export interface Skill {
  id: string;
  name: string;
  categoryName: string;
}

export interface StepProps {
  jobData: CreateJobProps;
  updateJobData: (updates: Partial<CreateJobProps>) => void;
}
