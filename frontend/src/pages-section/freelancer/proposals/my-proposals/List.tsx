"use client";

import { ProposalProps } from "@/types/proposals";
import { ProposalCard } from "./components/ProposalCard";
import { ProposalCardSkeleton } from "@/components/skeletons/ProposalCardSkeleton";

interface ProposalsListProps {
  proposals: ProposalProps[];
  isLoading: boolean;
}

export function ProposalsList({ proposals, isLoading }: ProposalsListProps) {
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
    <div className="space-y-4">
      {proposals.map((proposal) => (
        <ProposalCard key={proposal.id} proposal={proposal} />
      ))}
    </div>
  );
}
