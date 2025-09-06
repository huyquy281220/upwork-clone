export enum Role {
  CLIENT,
  FREELANCER,
}

export type ContractType = 'FIXED_PRICE' | 'HOURLY';
export type ContractStatus = 'PENDING' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
export type PaymentStatus =
  | 'PENDING'
  | 'AUTHORIZED'
  | 'PROCESSING'
  | 'PAID'
  | 'FAILED'
  | 'CANCELED'
  | 'REFUNDED'
  | 'SUCCEEDED';

export interface AuthenticatedUser {
  id: string;
  email: string;
  role: Role;
  clientProfile?: any;
  freelancerProfile?: any;
}

export type Payment = {
  amount: number;
  status: PaymentStatus;
};

export type Review = {
  rating: number;
};

export type WorkLog = {
  hours: number;
  loggedAt: Date;
};

export interface ContractProps {
  id: string;
  title: string;
  description: string;
  jobId: string;
  clientId: string;
  freelancerId: string;
  status: ContractStatus;
  contractType: ContractType;
  projectDuration: string;

  totalHours?: number;
  hourlyRate?: number;
  totalPrice?: number;

  startedAt: Date;
  completedAt?: Date | null;
  canceledAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;

  payments: Payment[];
  reviews: Review[];
  workLog: WorkLog[];
}
