"use client";

import { useState } from "react";
import {
  AttachmentsSection,
  CoverLetterSection,
  PricingSection,
  ProposalSidebar,
  SubmitSection,
  TimelineSection,
} from "@/pages-section/freelancer/Proposals";

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

export default function Apply() {
  const [proposal, setProposal] = useState<{
    coverLetter: string;
    pricing: number;
    timeline: string;
    attachment: File | null;
  }>({
    coverLetter: "",
    pricing: 0,
    timeline: "",
    attachment: null,
  });

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async () => {
    setStatus("loading");
    try {
      // Simulate API call
      const res = await new Promise((resolve) => setTimeout(resolve, 2000));

      if (res.status !== 200) {
        setStatus("error");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSetCoverLetter = (value: string) =>
    setProposal((prev) => ({ ...prev, coverLetter: value }));

  const handleSetAttachment = (file: File) => {
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
                isValid={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
