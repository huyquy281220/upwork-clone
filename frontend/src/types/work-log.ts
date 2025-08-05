export type WorkLogProps = {
  id: string;
  hours: number;
  loggedAt: string;
  endTime: string;
  description: string;
  contractId: string;
  freelancerId: string;

  createdAt: string;
  updatedAt: string;
};

export type CreateWorkLogProps = {
  contractId: string;
  hours: number;
  loggedAt: string;
  endTime: string;
  description: string;
};
