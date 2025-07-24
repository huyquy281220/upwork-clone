export interface MilestoneProps {
  id: string;
  name: string;
  description: string;
  amount: string;
  dueDate: string;
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
