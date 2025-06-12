// frontend/src/types/user.ts

// Enums
export enum Role {
  CLIENT = "CLIENT",
  FREELANCER = "FREELANCER",
}

export enum Availability {
  MORE_THAN_30 = "MORE_THAN_30",
  LESS_THAN_30 = "LESS_THAN_30",
  AS_NEEDED = "AS_NEEDED",
  NONE = "NONE",
}

export enum Proficiency {
  BASIC = "BASIC",
  CONVERSATIONAL = "CONVERSATIONAL",
  FLUENT = "FLUENT",
  NATIVE = "NATIVE",
}

export enum JobType {
  FIXED = "FIXED",
  HOURLY = "HOURLY",
}

export enum ProposalStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
}

export enum ContractStatus {
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

// Base interfaces
export interface BaseUser {
  id: string;
  email: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
  avatarUrl?: string;
  fullName?: string;
  phoneNumber?: string;
  address?: string;
  verified: boolean;
}

export interface ClientProfile {
  id: string;
  userId: string;
  companyName?: string;
  website?: string;
  industry?: string;
}

export interface FreelancerProfile {
  id: string;
  userId: string;
  hourlyRate?: number;
  title?: string;
  overview?: string;
  available: Availability;
  skills?: UserSkill[];
  savedJobs?: UserSavedJob[];
  languages?: {
    name: string;
    proficiency: string;
  }[];
  education?: Education[];
}

// Additional related interfaces
export interface UserSkill {
  userId: string;
  skillId: string;
  proficiency?: number;
  skill: Skill;
}

export interface Education {
  id: string;
  school: string;
  startYear: number;
  endYear: number;
  degree: string;
  areaOfStudy: string;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  category?: string;
}

export interface UserSavedJob {
  id: string;
  userId: string;
  jobId: string;
  createdAt: string;
  job: Job;
}

export interface Job {
  id: string;
  clientId: string;
  title: string;
  description: string;
  category: string;
  budget: number;
  type: JobType;
  createdAt: string;
  skills: JobSkill[];
}

export interface JobSkill {
  jobId: string;
  skillId: string;
  skill: Skill;
}

// Combined User Types
export interface ClientUser extends BaseUser {
  role: Role.CLIENT;
  clientProfile: ClientProfile;
  freelancerProfile: null;
}

export interface FreelancerUser extends BaseUser {
  role: Role.FREELANCER;
  clientProfile: null;
  freelancerProfile: FreelancerProfile;
}

export type User = ClientUser | FreelancerUser;

// Update Input Types
interface BaseUserUpdateInput {
  email: string;
  fullName?: string;
  phoneNumber?: string;
  address?: string;
  avatarUrl?: string;
}
export interface ClientUserUpdateInput extends BaseUserUpdateInput {
  clientProfile: {
    companyName?: string;
    website?: string;
    industry?: string;
  };
}
export interface FreelancerUserUpdateInput extends BaseUserUpdateInput {
  freelancerProfile: {
    title?: string;
    hourlyRate?: number;
    overview?: string;
    available?: Availability;
  };
}

export type UserUpdateInput = ClientUserUpdateInput | FreelancerUserUpdateInput;
