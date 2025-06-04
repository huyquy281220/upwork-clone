export interface UserProps {
  id: string;
  fullName: string;
  email: string;
  role: string;
  address: string;
  phone: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
}

export interface ClientProps extends UserProps {
  companyName: string;
}

export interface FreelancerProps extends UserProps {
  title: string;
  skills: string[];
  description: string;
  hourlyRate: number;
  availability: string;
}

export enum Role {
  FREELANCER = "Freelancer",
  CLIENT = "Client",
}
