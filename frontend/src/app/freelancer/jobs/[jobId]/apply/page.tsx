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
  const [coverLetter, setCoverLetter] = useState("");
  const [proposalType, setProposalType] = useState<"hourly" | "fixed">(
    "hourly"
  );
  const [hourlyRate, setHourlyRate] = useState("");
  const [fixedPrice, setFixedPrice] = useState("");
  const [timeline, setTimeline] = useState("");

  const [attachments, setAttachments] = useState<
    Array<{ name: string; size: number; type: string }>
  >([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const isValid = coverLetter.trim() && (hourlyRate || fixedPrice) && timeline;

  if (isSubmitted) {
    // return <ProposalSuccess clientName={jobData.client.name} />;
  }

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
                coverLetter={coverLetter}
                setCoverLetter={setCoverLetter}
              />

              <PricingSection
                proposalType={proposalType}
                setProposalType={setProposalType}
                hourlyRate={hourlyRate}
                setHourlyRate={setHourlyRate}
                fixedPrice={fixedPrice}
                setFixedPrice={setFixedPrice}
                jobBudget={jobData.budget}
              />

              <TimelineSection timeline={timeline} setTimeline={setTimeline} />

              <AttachmentsSection
                attachments={attachments}
                setAttachments={setAttachments}
              />

              <SubmitSection
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                isValid={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
