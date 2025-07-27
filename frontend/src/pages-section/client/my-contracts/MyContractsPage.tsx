"use client";

import { useState } from "react";
import { ContractsHeader } from "./ContractsHeader";
import { ContractsFilters } from "./ContractsFilter";
import { ContractsList } from "./ContractsList";
import { ContractDetails } from "./ContractDetails";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";

const mockContracts = [
  {
    id: "1",
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
      "Full-stack e-commerce website with payment integration, user authentication, product catalog, shopping cart, and admin dashboard. The project includes responsive design, SEO optimization, and comprehensive testing.",
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
  },
  {
    id: "2",
    title: "Mobile App UI/UX Design",
    freelancer: {
      name: "Alex Chen",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 4.8,
      location: "Canada",
      verified: true,
    },
    status: "Active",
    startDate: "2024-02-01",
    budget: "$75/hr",
    budgetType: "Hourly",
    hourlyRate: "$75/hr",
    totalPaid: "$2,250",
    progress: 45,
    category: "Design",
    description:
      "Complete UI/UX design for a mobile fitness tracking application. Includes user research, wireframing, prototyping, and final design deliverables.",
    milestones: [], // No milestones for hourly contracts
  },
  {
    id: "3",
    title: "Content Writing for Blog",
    freelancer: {
      name: "Emma Wilson",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 4.7,
      location: "United Kingdom",
      verified: false,
    },
    status: "Completed",
    startDate: "2024-01-01",
    budget: "$1,200",
    budgetType: "Fixed Price",
    hourlyRate: null,
    totalPaid: "$1,200",
    progress: 100,
    category: "Writing",
    description:
      "SEO-optimized blog content creation for technology startup. 12 articles covering various tech topics with keyword research and optimization.",
    milestones: [], // Fixed price but no milestones (optional)
  },
  {
    id: "4",
    title: "Data Analysis & Visualization",
    freelancer: {
      name: "Michael Rodriguez",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 4.9,
      location: "Spain",
      verified: true,
    },
    status: "Active",
    startDate: "2024-02-10",
    budget: "$65/hr",
    budgetType: "Hourly",
    hourlyRate: "$65/hr",
    totalPaid: "$1,950",
    progress: 30,
    category: "Data Science",
    description:
      "Comprehensive data analysis and visualization dashboard for sales performance metrics. Includes data cleaning, statistical analysis, and interactive dashboard creation.",
    milestones: [], // No milestones for hourly contracts
  },
];

export function MyContractsPage() {
  const { data: session } = useSession();
  const [selectedContract, setSelectedContract] = useState<string | null>(null);
  const [filteredContracts, setFilteredContracts] = useState(mockContracts);

  const { data: contracts, isLoading } = useQuery({
    queryKey: ["contracts", session?.user?.id],
    queryFn: () => {},
    enabled: !!session?.user?.id,
  });

  const handleContractSelect = (contractId: string) => {
    setSelectedContract(contractId);
  };

  const handleBackToList = () => {
    setSelectedContract(null);
  };

  const handleFiltersChange = (filters: any) => {
    let filtered = mockContracts;

    if (filters.status && filters.status !== "all") {
      filtered = filtered.filter(
        (contract) =>
          contract.status.toLowerCase() === filters.status.toLowerCase()
      );
    }

    if (filters.contractType && filters.contractType !== "all") {
      filtered = filtered.filter(
        (contract) =>
          contract.budgetType.toLowerCase().replace(" ", "") ===
          filters.contractType.toLowerCase()
      );
    }

    if (filters.search) {
      filtered = filtered.filter(
        (contract) =>
          contract.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          contract.freelancer.name
            .toLowerCase()
            .includes(filters.search.toLowerCase())
      );
    }

    setFilteredContracts(filtered);
  };

  if (selectedContract) {
    const contract = mockContracts.find((c) => c.id === selectedContract);
    if (contract) {
      return <ContractDetails contract={contract} onBack={handleBackToList} />;
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ContractsHeader contracts={mockContracts} />
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <ContractsFilters onFiltersChange={handleFiltersChange} />
          </div>
          <div className="lg:col-span-3">
            <ContractsList
              contracts={filteredContracts}
              onContractSelect={handleContractSelect}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
