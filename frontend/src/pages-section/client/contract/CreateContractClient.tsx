"use client";

import { useEffect, useState } from "react";
import {
  ContractActions,
  ContractHeader,
  ContractSummary,
  ContractTerms,
} from "@/pages-section/client/contract";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { getOneProposal } from "@/services/proposals";
import { ProposalProps } from "@/types/proposals";
import { JobType } from "@/types/jobs";
import { InfiniteLoading } from "@/components/common/InfiniteLoading";
import { MilestonesSection } from "./Milestone";
import { CreateContractDto, MilestoneProps } from "@/types/contract";
import { createContract } from "@/services/contract";
import { useSession } from "next-auth/react";
import { useUser } from "@/hooks/useUserInfo";
import { ClientUser } from "@/types/user";

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
  job: Pick<ProposalProps["job"], "title" | "jobType" | "id">;
  freelancer: {
    title: string;
    id: string;
    user: Pick<ProposalProps["freelancer"]["user"], "fullName">;
  };
};

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
  const [budget, setBudget] = useState(0);
  const [projectDuration, setProjectDuration] = useState("");
  const [startDate, setStartDate] = useState("");
  const [contractTitle, setContractTitle] = useState("");
  const [description, setDescription] = useState("");
  const [milestones, setMilestones] = useState<MilestoneProps[]>([]);

  const { data: session } = useSession();
  const { data: user } = useUser<ClientUser>(session?.user.id as string);

  const { data: proposal, isLoading } = useQuery<PartialProposalProps>({
    queryKey: ["proposal-for-contract", proposalId],
    queryFn: () => getOneProposal(proposalId),
    enabled: !!proposalId,
  });

  const createContractMutation = useMutation({
    mutationFn: (data: CreateContractDto) => createContract(data),
    onSuccess: () => {
      router.push("/client/contracts");
    },
    onError: () => {},
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

  if (!proposal || isLoading || !user || !session) return <InfiniteLoading />;

  const handleBackToProposal = () => {
    router.back();
  };

  const handleSendContract = async () => {
    try {
      createContractMutation.mutate({
        jobId: proposal.job.id,
        freelancerId: proposal.freelancer.id,
        clientId: user?.clientProfile.id,
        title: contractTitle,
        description: description,
        hourlyRate: hourlyRate,
        projectDuration: projectDuration,
        startedAt: new Date(startDate).toISOString(),
        milestones: milestones,
      });
    } catch (error) {
      console.error("Contract creation failed:", error);
    }
  };

  const isValid =
    contractTitle.trim() &&
    description.trim() &&
    projectDuration &&
    startDate &&
    ((contractType === JobType.HOURLY && hourlyRate) ||
      (contractType === JobType.FIXED_PRICE && fixedPrice));

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
                clientBudget={budget}
                setClientBudget={setBudget}
                // proposalType={jobData.proposalType}
                // proposalRate={jobData.proposalRate}
              />

              <MilestonesSection
                milestones={milestones}
                setMilestones={setMilestones}
                contractType={contractType}
              />

              <ContractActions
                onSaveDraft={handleBackToProposal}
                onSendContract={handleSendContract}
                isValid={!!isValid}
                isSending={createContractMutation.isPending}
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
