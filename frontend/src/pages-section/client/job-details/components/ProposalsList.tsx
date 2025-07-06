"use client";

import { ProposalProps } from "@/types/proposals";
import { ProposalCard } from "./ProposalCard";

interface ProposalsListProps {
  proposals: ProposalProps[];
  onViewDetails: (proposal: ProposalProps) => void;
}

export function ProposalsList({
  proposals,
  onViewDetails,
}: ProposalsListProps) {
  console.log(proposals);
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
