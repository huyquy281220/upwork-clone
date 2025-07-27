"use client";

import { useState } from "react";
import { ContractsHeader } from "./ContractsHeader";
import { ContractsFilters } from "./ContractsFilter";
import { ContractsList } from "./ContractsList";
import { ContractDetails } from "./ContractDetails";
import { useSession } from "next-auth/react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import useFilter from "@/hooks/useFilter";
import { ContractProps } from "@/types/contract";
import { InfiniteLoading } from "@/components/common/InfiniteLoading";
import { getPaginatedContracts } from "@/services/contract";

type PaginatedContractsProps = {
  contracts: ContractProps[];
  totalPage: number;
  totalContracts: number;
};

const defaultFilters = {
  search: "",
  status: "all",
  type: "all",
  date: "all",
};
const LIMIT = 6;

export function MyContractsPage() {
  const { data: session } = useSession();
  const [selectedContract, setSelectedContract] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { getFilter, setFilter, resetFilters } = useFilter(defaultFilters);

  const searchQuery = getFilter("search");
  const type = getFilter("type");
  const date = getFilter("date");
  const status = getFilter("status");

  const { data: paginatedContracts, isLoading } =
    useQuery<PaginatedContractsProps>({
      queryKey: ["contracts", session?.user?.id],
      queryFn: () =>
        getPaginatedContracts(
          session?.user?.id ?? "",
          LIMIT,
          currentPage,
          searchQuery,
          type,
          date,
          status
        ),
      enabled: !!session?.user?.id,
      placeholderData: keepPreviousData,
    });

  const handleFilterChange = (key: string, value: string) => {
    setFilter(key as keyof typeof defaultFilters, value);
  };

  const handleContractSelect = (contractId: string) => {
    setSelectedContract(contractId);
  };

  const handleBackToList = () => {
    setSelectedContract(null);
  };

  if (selectedContract) {
    const contract = paginatedContracts?.contracts.find(
      (c) => c.id === selectedContract
    );
    if (contract) {
      return <ContractDetails contract={contract} onBack={handleBackToList} />;
    }
  }

  if (isLoading || !paginatedContracts) return <InfiniteLoading />;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ContractsHeader contracts={paginatedContracts.contracts ?? []} />
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <ContractsFilters
              onFiltersChange={handleFilterChange}
              resetFilters={resetFilters}
              status={status}
              contractType={type}
              dateRange={date}
            />
          </div>
          <div className="lg:col-span-3">
            <ContractsList
              contracts={paginatedContracts.contracts ?? []}
              onContractSelect={handleContractSelect}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
