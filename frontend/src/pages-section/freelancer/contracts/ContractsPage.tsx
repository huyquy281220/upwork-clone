"use client";

import { useState } from "react";
import { ContractsHeader } from "./ContractsHeader";
import { ContractsFilters } from "./ContractsFilter";
import { ContractsTable } from "./ContractsTable";
import useFilter from "@/hooks/useFilter";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getPaginatedContractsForFreelancer } from "@/services/contract";
import { useSession } from "next-auth/react";
import { InfiniteLoading } from "@/components/common/InfiniteLoading";
import { Pagination } from "@/components/common/Pagination";

const LIMIT = 10;

export function ContractsPage() {
  const { data: session } = useSession();
  const { getFilter, setFilter, resetFilters } = useFilter({
    searchQuery: "",
    status: "all",
    type: "all",
    sortBy: "newest",
  });
  const [currentPage, setCurrentPage] = useState(1);

  const searchQuery = getFilter("searchQuery");
  const statusFilter = getFilter("status");
  const typeFilter = getFilter("type");
  const sortBy = getFilter("sortBy");

  const { data: paginatedContract, isLoading } = useQuery({
    queryKey: [
      "freelancer-contracts",
      session?.user?.id,
      searchQuery,
      statusFilter,
      typeFilter,
      sortBy,
    ],
    queryFn: () =>
      getPaginatedContractsForFreelancer(
        session?.user?.id ?? "",
        LIMIT,
        currentPage,
        statusFilter,
        searchQuery,
        typeFilter,
        sortBy
      ),
    enabled: !!session?.user?.id,
    placeholderData: keepPreviousData,
  });

  if (isLoading || !paginatedContract) return <InfiniteLoading />;

  return (
    <div className="container mx-auto py-10 px-3 md:px-0">
      <ContractsHeader />

      <ContractsFilters
        searchQuery={searchQuery}
        setSearchQuery={(query: string) => setFilter("searchQuery", query)}
        statusFilter={statusFilter}
        setStatusFilter={(status: string) => setFilter("status", status)}
        typeFilter={typeFilter}
        setTypeFilter={(type: string) => setFilter("type", type)}
        sortBy={sortBy}
        setSortBy={(sort: string) => setFilter("sortBy", sort)}
        totalContracts={paginatedContract.totalCount}
        filteredCount={paginatedContract.totalCount}
        onClearFilters={resetFilters}
      />

      <ContractsTable contracts={paginatedContract.data} />

      {paginatedContract.totalPages > LIMIT && (
        <Pagination
          currentPage={currentPage}
          totalPages={paginatedContract.totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
