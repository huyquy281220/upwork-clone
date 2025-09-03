"use client";

import { useQuery } from "@tanstack/react-query";
import { ContractProgressTabs } from "./ContractHeaderTabs";
import { ContractProgressHeader } from "./ContractProgressHeader";
import { getClientByContract } from "@/services/contract";
import { useParams } from "next/navigation";
import { ClientByContractProps } from "@/types/contract";

// Mock contract data
const mockContract = {
  id: 1,
  title: "E-commerce Website Development",
  freelancer: {
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 4.9,
    location: "United States",
    verified: true,
  },
  status: "Active",
  startDate: "2024-01-15",
  budget: "$5,000",
  budgetType: "Fixed Price",
  hourlyRate: null,
  totalPaid: "$3,000",
  progress: 65,
  category: "Web Development",
  description:
    "Full-stack e-commerce website with payment integration, user authentication, product catalog, shopping cart, and admin dashboard.",
  milestones: [
    {
      id: 1,
      title: "Project Setup & Planning",
      amount: "$1,000",
      status: "Completed",
      dueDate: "2024-01-25",
    },
    {
      id: 2,
      title: "Frontend Development",
      amount: "$2,000",
      status: "Completed",
      dueDate: "2024-02-10",
    },
    {
      id: 3,
      title: "Backend Development",
      amount: "$1,500",
      status: "In Progress",
      dueDate: "2024-02-25",
    },
    {
      id: 4,
      title: "Testing & Deployment",
      amount: "$500",
      status: "Pending",
      dueDate: "2024-03-10",
    },
  ],
};

export function ContractProgressPage() {
  const params = useParams();
  const contractId = params.contractId;

  const { data: clientData } = useQuery<ClientByContractProps>({
    queryKey: ["client-by-contract", contractId],
    queryFn: () => getClientByContract(contractId as string),
    enabled: !!contractId,
  });

  console.log(clientData);

  return (
    <div className="min-h-screen bg-background">
      <ContractProgressHeader contract={mockContract} />
      <ContractProgressTabs contract={mockContract} />
    </div>
  );
}
