"use client";

import { useState } from "react";
import { ContractsHeader } from "./ContractsHeader";
import { ContractsFilters } from "./ContractsFilter";
import { ContractsList } from "./ContractsList";
import { ContractDetails } from "./ContractDetails";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import useFilter from "@/hooks/useFilter";
import { ContractProps } from "@/types/contract";

type PaginatedContractsProps = {
  contracts: ContractProps[];
  totalPage: number;
  totalContracts: number;
};

export function MyContractsPage() {
  const { data: session } = useSession();
  const [selectedContract, setSelectedContract] = useState<string | null>(null);
  const [filteredContracts, setFilteredContracts] = useState(mockContracts);
  const { getFilter, setFilter, resetFilters } = useFilter({
    search: "",
    status: "all",
    type: "all",
    date: "all",
  });

  const { data: contracts, isLoading } = useQuery({
    queryKey: ["contracts", session?.user?.id],
    queryFn: () => {},
    enabled: !!session?.user?.id,
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilter(key as keyof typeof filters, value);
  };

  const handleContractSelect = (contractId: string) => {
    setSelectedContract(contractId);
  };

  const handleBackToList = () => {
    setSelectedContract(null);
  };

  const handleFiltersChange = () => {};

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
