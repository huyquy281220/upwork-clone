"use client";

import { ProposalProps } from "@/types/proposals";
import { ProposalCard } from "./components/ProposalCard";

interface ProposalsListProps {
  proposals: ProposalProps[];
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
