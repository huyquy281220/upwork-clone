"use client";

import { useState } from "react";
import { ContractHeader } from "./ContractHeader";
import { ClientInfo } from "./ClientInfo";
import { ContractTerms } from "./ContractTerms";
import { MilestonesDisplay } from "./Milestones";
import { ContractActions } from "./ContractActions";
import { ContractSuccess } from "./ContractSuccess";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getContractById, updateContract } from "@/services/contract";
import { useParams } from "next/navigation";
import { ContractProps, ContractStatus } from "@/types/contract";
import { InfiniteLoading } from "@/components/common/InfiniteLoading";
import { useToast } from "@/hooks/useToast";
import { ModernToast } from "@/components/common/ModernToast";

// Sample contract data
const contractData = {
  id: 1,
  title: "Full Stack Developer for SaaS Platform",
  description: `We're looking for an experienced full-stack developer to help build our next-generation SaaS platform. You'll work with React, Node.js, and PostgreSQL to create scalable web applications.

Key responsibilities:
• Develop responsive frontend components using React and TypeScript
• Build robust backend APIs with Node.js and Express
• Design and optimize PostgreSQL database schemas
• Implement user authentication and authorization
• Deploy and maintain applications on AWS
• Write comprehensive tests and documentation

The ideal candidate should have 3+ years of experience and be comfortable working in an agile environment. We value clean code, attention to detail, and proactive communication.`,
  type: "fixed" as const,
  fixedPrice: 12000,
  duration: "3-4 months",
  startDate: "2024-03-01",
  status: "pending" as const,
  sentDate: "February 20, 2024",
  expiresDate: "February 27, 2024",
  skills: ["React", "Node.js", "PostgreSQL", "TypeScript", "AWS", "Express.js"],
  milestones: [
    {
      id: "1",
      name: "Project Setup & Architecture",
      description:
        "Set up development environment, project structure, and core architecture. Implement basic authentication and database setup.",
      amount: 3000,
      dueDate: "2024-03-15",
      status: "pending" as const,
    },
    {
      id: "2",
      name: "Core Features Development",
      description:
        "Develop main application features including user dashboard, data management, and core business logic.",
      amount: 5000,
      dueDate: "2024-04-15",
      status: "pending" as const,
    },
    {
      id: "3",
      name: "Advanced Features & Integration",
      description:
        "Implement advanced features, third-party integrations, and performance optimizations.",
      amount: 3000,
      dueDate: "2024-05-15",
      status: "pending" as const,
    },
    {
      id: "4",
      name: "Testing, Deployment & Documentation",
      description:
        "Comprehensive testing, production deployment, and complete project documentation.",
      amount: 1000,
      dueDate: "2024-05-30",
      status: "pending" as const,
    },
  ],
};

const clientData = {
  name: "Sarah Johnson",
  avatar: "/placeholder.svg?height=60&width=60",
  company: "TechCorp Solutions",
  location: "San Francisco, CA",
  rating: 4.9,
  reviewsCount: 127,
  totalSpent: "$85K+",
  hireRate: 92,
  verified: true,
  memberSince: "January 2020",
  jobsPosted: 45,
  activeHires: 8,
};

const contractDetails = {
  sentDate: "February 20, 2024",
  expiresDate: "February 27, 2024",
  responseTime: "7 days",
};

export function ContractDetails() {
  const params = useParams();
  const contractId = params.contractId;
  const queryClient = useQueryClient();

  const [isProcessing, setIsProcessing] = useState(false);
  const [actionCompleted, setActionCompleted] = useState<
    "accepted" | "declined" | "changes-requested" | null
  >(null);

  const { toast, showSuccessToast, showErrorToast, activeToasts } = useToast();

  const { data: contract, isLoading } = useQuery<ContractProps>({
    queryKey: ["contract", contractId],
    queryFn: () => getContractById(contractId as string),
  });

  const acceptContractMutation = useMutation({
    mutationFn: () =>
      updateContract(contractId as string, {
        status: ContractStatus.ACTIVE,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contract", contractId] });
      setIsProcessing(true);
      showSuccessToast("Your accepted the contract", "", 1200);
    },
    onError: () => {
      showErrorToast("Failed to accept contract", "", 1200);
    },
  });

  const declineContractMutation = useMutation({
    mutationFn: () =>
      updateContract(contractId as string, {
        status: ContractStatus.CANCELLED,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contract", contractId] });
      setIsProcessing(true);
      showSuccessToast("You declined the contract", "", 1200);
    },
    onError: () => {
      showErrorToast("Failed to decline contract", "", 1200);
    },
  });

  const handleAccept = async () => {
    acceptContractMutation.mutate();
    setIsProcessing(false);
    setActionCompleted("accepted");
  };

  const handleDecline = async () => {
    declineContractMutation.mutate();
    setIsProcessing(false);
    setActionCompleted("declined");
  };

  const handleRequestChanges = async (message: string) => {
    setIsProcessing(true);
    // Simulate API call
    console.log("Requesting changes:", message);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsProcessing(false);
    setActionCompleted("changes-requested");
  };

  if (actionCompleted) {
    return (
      <ContractSuccess
        action={actionCompleted}
        clientName={clientData.name}
        contractTitle={contractData.title}
      />
    );
  }

  if (isLoading) return <InfiniteLoading />;

  return (
    <div className="min-h-screen bg-background">
      <ContractHeader
        contractTitle={contractData.title}
        clientName={clientData.name}
        status={contractData.status}
        sentDate={contractData.sentDate}
        expiresDate={contractData.expiresDate}
      />

      <div className="max-w-[80rem] mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="space-y-8">
              <ContractTerms contract={contractData} />

              <MilestonesDisplay
                milestones={contractData.milestones}
                contractType={contractData.type}
              />

              <ContractActions
                contractStatus={contractData.status}
                onAccept={handleAccept}
                onDecline={handleDecline}
                onRequestChanges={handleRequestChanges}
                isProcessing={isProcessing}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <ClientInfo client={clientData} contractDetails={contractDetails} />
          </div>
        </div>
      </div>

      {activeToasts && <ModernToast {...toast} />}
    </div>
  );
}
