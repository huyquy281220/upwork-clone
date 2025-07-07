interface ContractHeaderProps {
  freelancerName: string;
  jobTitle: string;
}

export function ContractHeader({
  freelancerName,
  jobTitle,
}: ContractHeaderProps) {
  return (
    <div className="border-b">
      <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pb-2">
          <h1 className="text-3xl font-semibold text-foreground">
            Create Contract
          </h1>
          <p className="text-sm text-foreground opacity-80">
            Hiring {freelancerName} for &#34;{jobTitle}&#34;
          </p>
        </div>
      </div>
    </div>
  );
}
