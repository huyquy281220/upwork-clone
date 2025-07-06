import { JobProps } from "./jobs";
import { Skill } from "./user";

export interface CreateProposalProps {
  freelancerId: string;
  jobId: string;
  coverLetter: string;
  pricing: number;
  timeline: string;
  attachment: File | null;
}

export interface ProposalProps {
  id: string;
  freelancerId: string;
  jobId: string;
  coverLetter: string;
  pricing: number;
  timeline: string;
  attachment: string;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
  createdAt: string;
  updatedAt: string;
  job: JobProps;
  freelancer: {
    id: string;
    userId: string;
    hourlyRate: number;
    title: string;
    overview: string | null;
    available: "LESS_THAN_30" | "MORE_THAN_30" | "FULL_TIME";
    skills: Skill[];
    user: {
      fullName: string;
      address: string;
      verified: boolean;
      avatarUrl: string;
    };
  };
}
