"use client";

interface ProposalsHeaderProps {
  totalProposal: number;
}

export function ProposalsHeader({ totalProposal }: ProposalsHeaderProps) {
  return (
    <div className="bg-background">
      <div className="max-w-7xl mx-auto px-4 py-2 sm:px-6 lg:px-8">
        <h1 className="w-fit text-2xl font-semibold text-foreground">
          My Proposals <span>({totalProposal})</span>
        </h1>
      </div>
    </div>
  );
}
