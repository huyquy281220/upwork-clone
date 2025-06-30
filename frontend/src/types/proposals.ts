export interface CreateProposalProps {
  freelancerId: string;
  jobId: string;
  coverLetter: string;
  pricing: number;
  timeline: string;
  attachment: File | null;
}
