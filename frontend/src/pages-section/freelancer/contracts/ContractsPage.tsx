"use client";

import { useState, useMemo } from "react";
import { ContractsHeader } from "./ContractsHeader";
import { ContractsFilters } from "./ContractsFilter";
import { ContractsTable } from "./ContractsTable";

// Mock data for contracts
const mockContracts = [
  {
    id: 1,
    title: "Website Redesign",
    client: "Acme Corp",
    freelancer: "John Doe",
    status: "active",
    type: "fixedprice",
    budget: 5000,
    hourlyRate: null,
    startDate: "2024-01-15",
    endDate: "2024-03-15",
    progress: 65,
    lastActivity: "2024-01-20",
  },
  {
    id: 2,
    title: "Mobile App Development",
    client: "Tech Startup",
    freelancer: "Jane Smith",
    status: "completed",
    type: "fixedprice",
    budget: 12000,
    hourlyRate: null,
    startDate: "2023-10-01",
    endDate: "2024-01-10",
    progress: 100,
    lastActivity: "2024-01-10",
  },
  {
    id: 3,
    title: "Content Writing",
    client: "Marketing Agency",
    freelancer: "Mike Johnson",
    status: "active",
    type: "hourly",
    budget: null,
    hourlyRate: 45,
    startDate: "2024-01-01",
    endDate: null,
    progress: 40,
    lastActivity: "2024-01-19",
  },
  {
    id: 4,
    title: "Logo Design",
    client: "Small Business",
    freelancer: "Sarah Wilson",
    status: "paused",
    type: "fixedprice",
    budget: 800,
    hourlyRate: null,
    startDate: "2024-01-10",
    endDate: "2024-02-10",
    progress: 25,
    lastActivity: "2024-01-15",
  },
  {
    id: 5,
    title: "Data Analysis",
    client: "Research Firm",
    freelancer: "David Brown",
    status: "cancelled",
    type: "hourly",
    budget: null,
    hourlyRate: 60,
    startDate: "2023-12-01",
    endDate: null,
    progress: 15,
    lastActivity: "2023-12-20",
  },
];

export function ContractsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  // Filter and sort contracts
  const filteredContracts = useMemo(() => {
    const filtered = mockContracts.filter((contract) => {
      const matchesSearch =
        contract.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contract.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contract.freelancer.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || contract.status === statusFilter;
      const matchesType = typeFilter === "all" || contract.type === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });

    // Sort contracts
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return (
            new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
          );
        case "oldest":
          return (
            new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
          );
        case "budget-high":
          const budgetA = a.budget || (a.hourlyRate ? a.hourlyRate * 40 : 0);
          const budgetB = b.budget || (b.hourlyRate ? b.hourlyRate * 40 : 0);
          return budgetB - budgetA;
        case "budget-low":
          const budgetA2 = a.budget || (a.hourlyRate ? a.hourlyRate * 40 : 0);
          const budgetB2 = b.budget || (b.hourlyRate ? b.hourlyRate * 40 : 0);
          return budgetA2 - budgetB2;
        case "progress":
          return b.progress - a.progress;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, statusFilter, typeFilter, sortBy]);

  const clearFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setTypeFilter("all");
    setSortBy("newest");
  };

  return (
    <div className="container mx-auto py-10">
      <ContractsHeader />

      <ContractsFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        totalContracts={mockContracts.length}
        filteredCount={filteredContracts.length}
        onClearFilters={clearFilters}
      />

      <ContractsTable contracts={filteredContracts} />
    </div>
  );
}
