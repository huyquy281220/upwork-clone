"use client";

import { ProposalCard } from "./ProposalCard";

interface ProposalsListProps {
  proposals: Array<any>;
  onViewDetails: (proposal: any) => void;
  onMessage: (proposal: any) => void;
}

export function ProposalsList({
  proposals,
  onViewDetails,
  onMessage,
}: ProposalsListProps) {
  return (
    <div className="space-y-6">
      {proposals.map((proposal) => (
        <ProposalCard
          key={proposal.id}
          proposal={proposal}
          onViewDetails={onViewDetails}
          onMessage={onMessage}
        />
      ))}
    </div>
  );
}
