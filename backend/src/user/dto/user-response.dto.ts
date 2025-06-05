import { Role, Availability } from '@prisma/client';

export class ClientProfileResponseDto {
  id: string;
  companyName: string;
  website: string;
  industry: string;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class FreelancerProfileResponseDto {
  id: string;
  title: string;
  overview: string;
  available: Availability;
  hourlyRate: number;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class UserResponseDto {
  id: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  address: string;
  avatarUrl: string;
  role: Role;
  verified: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  clientProfile?: ClientProfileResponseDto | null;
  freelancerProfile?: FreelancerProfileResponseDto | null;
}
