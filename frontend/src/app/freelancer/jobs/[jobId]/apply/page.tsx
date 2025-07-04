"use client";

import { useMemo, useState } from "react";
import {
  AttachmentsSection,
  CoverLetterSection,
  PricingSection,
  ProposalSidebar,
  SubmitSection,
  TimelineSection,
} from "@/pages-section/freelancer/Proposals/create-proposal";
import { createProposal } from "@/services/proposals";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useUser } from "@/hooks/useUserInfo";
import { LoadingComp } from "@/components/common/LoadingComp";
import { FreelancerUser } from "@/types/user";
import { useToast } from "@/hooks/useToast";
import { ModernToast } from "@/components/common/ModernToast";

const jobData = {
  id: 1,
  title: "Full Stack Developer for SaaS Platform",
  description:
    "We're looking for an experienced full-stack developer to help build our next-generation SaaS platform. You'll work with React, Node.js, and PostgreSQL to create scalable web applications. The ideal candidate should have 3+ years of experience and be comfortable working in an agile environment.",
  budget: { type: "hourly", min: 40, max: 80 },
  duration: "3-6 months",
  experienceLevel: "Expert",
  skills: ["React", "Node.js", "PostgreSQL", "TypeScript", "AWS"],
  client: {
    name: "TechCorp Solutions",
    avatar: "/placeholder.svg?height=40&width=40",
    location: "United States",
    rating: 4.9,
    totalSpent: "$50K+",
    hireRate: 85,
    verified: true,
  },
  postedTime: "2 hours ago",
  proposalsCount: 12,
  interviewingCount: 3,
  paymentVerified: true,
  featured: true,
  questions: [
    "What is your experience with React and Node.js?",
    "Can you provide examples of similar SaaS platforms you've built?",
    "What is your availability for this project?",
  ],
};

const initialProposal = {
  coverLetter: "",
  pricing: 0,
  timeline: "",
  attachment: null,
};

export default function Apply() {
  const router = useRouter();
  const { data: session } = useSession();
  const { data: user } = useUser<FreelancerUser>(session?.user.id ?? "");
  const params = useParams();
  const jobId = params.jobId as string;

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

  if (!session || !user) return <LoadingComp progress={session ? 100 : 50} />;

  const handleSubmit = async () => {
    setStatus("loading");
    try {
      const res = await createProposal({
        ...proposal,
        jobId,
        freelancerId: user?.freelancerProfile.id,
      });

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
    } catch (error) {
      console.error(error);
      setStatus("error");
      showErrorToast("Failed to create proposal. Please try again.", "", 1500);
    }
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
      <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          <h1 className="text-xl font-semibold text-foreground">
            Submit a Proposal
          </h1>
        </div>
      </div>

      <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Job Details Sidebar */}
          <div className="lg:col-span-1">
            <ProposalSidebar jobData={jobData} />
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
