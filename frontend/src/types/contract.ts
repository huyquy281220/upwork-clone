import { PaymentMethodProps } from "./payments";
import { ReviewProps } from "./review";

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

export interface MilestoneProps {
  id: string;
  name: string;
  description: string;
  amount: string;
  dueDate: string;
  status: MilestoneStatus;
}

export interface WorkLogProps {
  id: string;
  contractId: string;
  date: string;
  hours: number;
  description: string;
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
  totalPrice?: number;
  projectDuration: string;
  milestones?: MilestoneProps[];
  workLogs: WorkLogProps[];

  payment: PaymentMethodProps[];
  review: ReviewProps[];
  createdAt: string;
  updatedAt: string;
  startedAt: string;
  completedAt?: string;
  canceledAt?: string;
}

export interface CreateContractDto {
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
