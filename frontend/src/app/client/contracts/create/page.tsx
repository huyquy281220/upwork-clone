"use client";

import { useState } from "react";
// import { FreelancerSummary } from "./components/contract/freelancer-summary";
import {
  ContractActions,
  ContractHeader,
  ContractSummary,
  ContractTerms,
} from "@/pages-section/client/contract";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { getOneProposal } from "@/services/proposals";
import { ProposalProps } from "@/types/proposals";
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
  freelancer: Pick<ProposalProps["freelancer"], "userId" | "title">;
};

const jobData = {
  title: "Full Stack Developer for SaaS Platform",
  proposalType: "hourly" as const,
  proposalRate: 75,
};

// interface Milestone {
//   id: string;
//   name: string;
//   description: string;
//   amount: string;
//   dueDate: string;
// }

export default function CreateContractPage() {
  const searchParams = useSearchParams();
  const proposalId = searchParams.get("proposalId") as string;

  const [contractType, setContractType] = useState<"hourly" | "fixed">("fixed");
  const [hourlyRate, setHourlyRate] = useState(jobData.proposalRate.toString());
  const [weeklyLimit, setWeeklyLimit] = useState("");
  const [fixedPrice, setFixedPrice] = useState("");
  const [projectDuration, setProjectDuration] = useState("");
  const [startDate, setStartDate] = useState("");
  const [contractTitle, setContractTitle] = useState(jobData.title);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [description, setDescription] = useState("");
  // const [milestones, setMilestones] = useState<Milestone[]>([]);

  const { data: proposal } = useQuery<PartialProposalProps>({
    queryKey: ["proposal-for-contract", proposalId],
    queryFn: () => getOneProposal(proposalId),
    enabled: !!proposalId,
  });

  const handleSaveDraft = () => {
    // Save contract as draft
    console.log("Saving draft...");
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
    ((contractType === "hourly" && hourlyRate) ||
      (contractType === "fixed" && fixedPrice));

  if (!proposal) return;

  return (
    <div className="min-h-screen bg-background">
      <ContractHeader freelancerName={""} jobTitle={proposal.job.title} />

      <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="space-y-8">
              <ContractTerms
                contractType={contractType}
                setContractType={setContractType}
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
                proposalType={jobData.proposalType}
                proposalRate={jobData.proposalRate}
              />

              {/* <MilestonesSection
                    milestones={milestones}
                    setMilestones={setMilestones}
                    contractType={contractType}
                /> */}

              <ContractActions
                onSaveDraft={handleSaveDraft}
                onSendContract={handleSendContract}
                isValid={false}
                isSending={status === "loading"}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
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
