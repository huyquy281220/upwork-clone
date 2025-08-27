import { PaymentsProps } from "./payments";
import { ReviewProps } from "./review";
import { WorkLogProps } from "./work-log";
import { WorkSubmissionProps } from "./work-submissions";

export enum MilestoneStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  SUBMITTED = "SUBMITTED",
  COMPLETED = "COMPLETED",
  CANCELED = "CANCELED",
}

export enum ContractType {
  FIXED_PRICE = "FIXED_PRICE",
  HOURLY = "HOURLY",
}

export enum ContractStatus {
  PENDING = "PENDING",
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export interface MilestoneProps {
  id: string;
  name: string;
  description: string;
  amount: number;
  dueDate: string;
  status: MilestoneStatus;
}

export interface ContractProps {
  id: string;
  milestoneId: string;
  jobId: string;
  clientId: string;
  freelancerId: string;
  title: string;
  description: string;
  status: string;
  contractType: string;
  hourlyRate?: number;
  totalHours?: number;
  totalPrice?: number;
  projectDuration: string;
  milestones?: MilestoneProps[];

  createdAt: string;
  updatedAt: string;
  startedAt: string;
  completedAt?: string;
  canceledAt?: string;

  freelancer: {
    id: string;
    title: string;
    user: {
      verified: boolean;
      fullName: string;
      email: string;
      address: string;
      avatarUrl: string;
    };
  };

  client: {
    id: string;
    companyName: string;
    user: {
      verified: boolean;
      fullName: string;
      email: string;
      address: string;
      avatarUrl: string;
    };
  };

  job: {
    id: string;
    title: string;
    description: string;
    category: string;
    jobDuration: string;
    skills: {
      id: string;
      name: string;
    }[];
  };

  workLog?: WorkLogProps[];
  workSubmission?: WorkSubmissionProps[];
  milestone?: MilestoneProps[];
  payments?: PaymentsProps[];
  reviews?: ReviewProps[];
}

export interface CreateContractProps {
  jobId: string;
  freelancerId: string;
  clientId: string;
  milestones?: MilestoneProps[];
  title: string;
  description: string;
  projectDuration: string;
  hourlyRate?: number;
  fixedPrice?: number;
  startedAt: string;
}

export interface UpdateContractProps {
  clientId: string;
  status?: string;
  title?: string;
  description?: string;
  projectDuration?: string;
  hourlyRate?: number;
  fixedPrice?: number;
  startedAt?: string;
  completedAt?: string;
}
