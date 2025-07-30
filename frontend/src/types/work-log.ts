export interface WorkLog {
  id: string;
  hours: number;
  loggedAt: string;
  endTime: string;
  description: string;
  contractId: string;
  freelancerId: string;

  createdAt: string;
  updatedAt: string;
}
