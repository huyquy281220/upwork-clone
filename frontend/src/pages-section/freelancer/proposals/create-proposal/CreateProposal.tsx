"use client";

import { useMemo, useState } from "react";
import { InfiniteLoading } from "@/components/common/InfiniteLoading";
import { ModernToast } from "@/components/common/ModernToast";
import { useToast } from "@/hooks/useToast";
import { useUser } from "@/hooks/useUserInfo";
import { createProposal } from "@/services/proposals";
import { JobWithStatsProps } from "@/types/jobs";
import { CreateProposalProps } from "@/types/proposals";
import { FreelancerUser } from "@/types/user";
import { formatSelectValue } from "@/utils/formatSelectValue";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { AttachmentsSection } from "./Attachment";
import { CoverLetterSection } from "./CoverLetter";
import { PricingSection } from "./Pricing";
import { ProposalSidebar } from "./SideBar";
import { SubmitSection } from "./Submit";
import { TimelineSection } from "./Timeline";

const initialProposal = {
  coverLetter: "",
  pricing: 0,
  timeline: "",
  attachment: null,
};

export function CreateProposal() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const { data: user } = useUser<FreelancerUser>(session?.user.id ?? "");

  const params = useParams();
  const jobId = params.jobId as string;
  const jobData = queryClient.getQueryData<JobWithStatsProps>([
    "job-detail",
    jobId,
  ]);
  const jobDetail = jobData?.job;

  const [proposal, setProposal] = useState<{
    coverLetter: string;
    pricing: number;
    timeline: string;
    attachment: File | null;
  }>(initialProposal);

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const { toast, showSuccessToast, showErrorToast, activeToasts } = useToast();

  const isValid = useMemo(() => {
    return (
      proposal.coverLetter !== initialProposal.coverLetter ||
      proposal.pricing !== initialProposal.pricing ||
      proposal.timeline !== initialProposal.timeline ||
      proposal.attachment !== initialProposal.attachment
    );
  }, [proposal]);

  const createProposalMutation = useMutation({
    mutationFn: (proposalData: CreateProposalProps) =>
      createProposal(proposalData),
    onSuccess: (res) => {
      if (res.status === 201) {
        setStatus("success");
        showSuccessToast(
          "Create proposal successfully.",
          "Redirecting to proposals page.",
          1500
        );
        setTimeout(() => {
          setProposal(initialProposal);
          setStatus("idle");
          router.push("/freelancer/my-proposals");
        }, 1500);
      }
    },
    onError: (error) => {
      console.error(error);
      setStatus("error");
      showErrorToast("Failed to create proposal. Please try again.", "", 1500);
    },
    onMutate: () => {
      setStatus("loading");
    },
  });
  if (!session || !user || !jobData) return <InfiniteLoading />;
  if (!jobDetail) return;

  const handleSubmit = async () => {
    createProposalMutation.mutate({
      ...proposal,
      timeline: formatSelectValue(proposal.timeline),
      jobId,
      freelancerId: user?.freelancerProfile.id,
    });
  };

  const handleSetCoverLetter = (value: string) =>
    setProposal((prev) => ({ ...prev, coverLetter: value }));

  const handleSetAttachment = (file: File | null) => {
    setProposal((prev) => ({ ...prev, attachment: file }));
  };

  const handleSetTimeline = (value: string) => {
    setProposal((prev) => ({ ...prev, timeline: value }));
  };

  const handleSetPricing = (value: number) => {
    setProposal((prev) => ({ ...prev, pricing: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      {activeToasts && <ModernToast {...toast} />}
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          <h1 className="text-xl font-semibold text-foreground">
            Submit a Proposal
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Job Details Sidebar */}
          <div className="lg:col-span-1">
            <ProposalSidebar jobData={jobDetail} />
          </div>

          {/* Proposal Form */}
          <div className="lg:col-span-2">
            <div className="space-y-8">
              <CoverLetterSection
                coverLetter={proposal.coverLetter}
                setCoverLetter={handleSetCoverLetter}
              />

              <PricingSection
                pricing={proposal.pricing}
                setPricing={handleSetPricing}
                jobType={jobDetail.jobType}
              />

              <TimelineSection
                timeline={proposal.timeline}
                setTimeline={handleSetTimeline}
              />

              <AttachmentsSection setAttachments={handleSetAttachment} />

              <SubmitSection
                onSubmit={handleSubmit}
                isSubmitting={status === "loading"}
                isValid={isValid}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
