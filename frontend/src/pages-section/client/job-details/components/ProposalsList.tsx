"use client";

import { ProposalProps } from "@/types/proposals";
import { ProposalCard } from "./ProposalCard";
import { ProposalCardSkeleton } from "@/pages-section/freelancer/proposals/my-proposals";

interface ProposalsListProps {
  proposals: ProposalProps[];
  onViewDetails: (proposal: ProposalProps) => void;
  isLoading: boolean;
}

export function ProposalsList({
  proposals,
  onViewDetails,
  isLoading,
}: ProposalsListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array(3)
          .fill(0)
          .map((_, index) => (
            <ProposalCardSkeleton key={index} />
          ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {proposals.map((proposal) => (
        <ProposalCard
          key={proposal.id}
          proposal={proposal}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
}
