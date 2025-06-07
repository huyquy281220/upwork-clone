export enum Role {
  CLIENT,
  FREELANCER,
}

export interface AuthenticatedUser {
  id: string;
  email: string;
  role: Role;
  clientProfile?: any;
  freelancerProfile?: any;
}
