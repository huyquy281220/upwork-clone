"use client";

import { ProposalCard } from "./components/ProposalCard";

interface ProposalsListProps {
  proposals: Array<{
    id: number;
    jobTitle: string;
    client: {
      name: string;
      avatar: string;
      location: string;
      rating: number;
      totalSpent: string;
      verified: boolean;
    };
    status: string;
    submittedDate: string;
    budget: string;
    proposalRate: string;
    coverLetter: string;
    connects: number;
    boosted: boolean;
    viewed: boolean;
  }>;
}

export function ProposalsList({ proposals }: ProposalsListProps) {
  return (
    <div className="space-y-4">
      {proposals.map((proposal) => (
        <ProposalCard key={proposal.id} proposal={proposal} />
      ))}
    </div>
  );
}
