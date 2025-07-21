"use client";

import { useEffect, useState } from "react";
// import { FreelancerSummary } from "./components/contract/freelancer-summary";
import {
  ContractActions,
  ContractHeader,
  ContractSummary,
  ContractTerms,
} from "@/pages-section/client/contract";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { getOneProposal } from "@/services/proposals";
import { ProposalProps } from "@/types/proposals";
import { JobType } from "@/types/jobs";
import { InfiniteLoading } from "@/components/common/InfiniteLoading";
// import { MilestonesSection } from "./components/contract/milestones-section";

type PartialProposalProps = {
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
  job: Pick<ProposalProps["job"], "title" | "jobType">;
  freelancer: {
    title: string;
    user: Pick<ProposalProps["freelancer"]["user"], "fullName">;
  };
};

// interface Milestone {
//   id: string;
//   name: string;
//   description: string;
//   amount: string;
//   dueDate: string;
// }

export function CreateContractClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const proposalId = searchParams.get("proposalId") as string;

  const [contractType, setContractType] = useState<JobType>(
    JobType.FIXED_PRICE
  );
  const [hourlyRate, setHourlyRate] = useState(0);
  const [weeklyLimit, setWeeklyLimit] = useState("");
  const [fixedPrice, setFixedPrice] = useState(0);
  const [projectDuration, setProjectDuration] = useState("");
  const [startDate, setStartDate] = useState("");
  const [contractTitle, setContractTitle] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [description, setDescription] = useState("");
  // const [milestones, setMilestones] = useState<Milestone[]>([]);

  const { data: proposal, isLoading } = useQuery<PartialProposalProps>({
    queryKey: ["proposal-for-contract", proposalId],
    queryFn: () => getOneProposal(proposalId),
    enabled: !!proposalId,
  });

  useEffect(() => {
    if (proposal) {
      setContractTitle(proposal.job.title);
      setProjectDuration(proposal.timeline);
      setContractType(proposal.job.jobType);
      setFixedPrice(proposal.pricing);
      setHourlyRate(proposal.pricing);
    }
  }, [proposal]);

  const handleBackToProposal = () => {
    router.back();
  };

  const handleSendContract = async () => {
    setStatus("loading");
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
  };

  const isValid =
    contractTitle.trim() &&
    description.trim() &&
    projectDuration &&
    startDate &&
    ((contractType === JobType.HOURLY && hourlyRate) ||
      (contractType === JobType.FIXED_PRICE && fixedPrice));

  if (!proposal || isLoading) return <InfiniteLoading />;

  return (
    <div className="min-h-screen bg-background">
      <ContractHeader freelancerName={""} jobTitle={proposal.job.title} />

      <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="order-2 md:order-1 lg:col-span-2">
            <div className="space-y-8">
              <ContractTerms
                contractType={contractType}
                setContractType={(type) => setContractType(type as JobType)}
                hourlyRate={hourlyRate}
                setHourlyRate={setHourlyRate}
                weeklyLimit={weeklyLimit}
                setWeeklyLimit={setWeeklyLimit}
                fixedPrice={fixedPrice}
                setFixedPrice={setFixedPrice}
                projectDuration={projectDuration}
                setProjectDuration={setProjectDuration}
                startDate={startDate}
                setStartDate={setStartDate}
                contractTitle={contractTitle}
                setContractTitle={setContractTitle}
                description={description}
                setDescription={setDescription}
                // proposalType={jobData.proposalType}
                // proposalRate={jobData.proposalRate}
              />

              {/* <MilestonesSection
                    milestones={milestones}
                    setMilestones={setMilestones}
                    contractType={contractType}
                /> */}

              <ContractActions
                onSaveDraft={handleBackToProposal}
                onSendContract={handleSendContract}
                isValid={!!isValid}
                isSending={status === "loading"}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="order-1 md:order-2 lg:col-span-1">
            <ContractSummary
              contractType={contractType}
              hourlyRate={hourlyRate}
              weeklyLimit={weeklyLimit}
              fixedPrice={fixedPrice}
              projectDuration={projectDuration}
              startDate={startDate}
              contractTitle={contractTitle}
              // milestones={milestones}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
