"use client";

import { Pagination } from "@/components/common/Pagination";
import {
  ProposalsEmptyState,
  ProposalsFilters,
  ProposalsHeader,
  ProposalsList,
  ProposalsSearchSort,
} from "@/pages-section/freelancer/Proposals/my-proposals";
import { getPaginatedProposals } from "@/services/proposals";
import { ProposalProps } from "@/types/proposals";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useState } from "react";

interface PaginatedProposalsProps {
  data: ProposalProps[];
  totalPage: number;
  totalProposals: number;
}

const ITEMS_PER_PAGE = 5;

export default function ProposalsPage() {
  const { data: session } = useSession();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [dateFilter, setDateFilter] = useState("all");
  const [budgetRangeFilter, setBudgetRangeFilter] = useState("all");

  const {
    data: paginatedProposals,
    isLoading,
    isFetching,
  } = useQuery<PaginatedProposalsProps>({
    queryKey: [
      "paginated-proposals",
      session?.user.id,
      ITEMS_PER_PAGE,
      currentPage,
      searchQuery,
      statusFilter,
      sortBy,
      dateFilter,
      budgetRangeFilter,
    ],
    queryFn: () =>
      getPaginatedProposals(
        session?.user.id ?? "",
        ITEMS_PER_PAGE,
        currentPage,
        searchQuery,
        statusFilter,
        sortBy,
        dateFilter,
        budgetRangeFilter
      ),
    enabled: !!session?.user.id,
    placeholderData: keepPreviousData,
  });

  if (!paginatedProposals) return;
  const proposals = paginatedProposals.data ?? [];

  const statusCounts = {
    pending: proposals.filter((proposal) => proposal.status === "PENDING")
      .length,
    accepted: proposals.filter((proposal) => proposal.status === "ACCEPTED")
      .length,
    rejected: proposals.filter((proposal) => proposal.status === "REJECTED")
      .length,
  };

  const resetPagination = () => setCurrentPage(1);

  const handleClearFilters = () => {
    setStatusFilter("all");
    setDateFilter("all");
    setBudgetRangeFilter("all");
    setSearchQuery("");
    resetPagination();
  };

  return (
    <div className="min-h-screen">
      <ProposalsHeader totalProposal={paginatedProposals.totalProposals} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <ProposalsFilters
              statusFilter={statusFilter}
              setStatusFilter={(value) => {
                setStatusFilter(value);
                resetPagination();
              }}
              dateFilter={dateFilter}
              setDateFilter={(value) => {
                setDateFilter(value);
                resetPagination();
              }}
              budgetRangeFilter={budgetRangeFilter}
              setBudgetRangeFilter={(value) => {
                setBudgetRangeFilter(value);
                resetPagination();
              }}
              statusCounts={statusCounts}
              // filteredCount={filteredProposals.length}
              onClearFilters={handleClearFilters}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <ProposalsSearchSort
              setSearchQuery={setSearchQuery}
              sortBy={sortBy}
              setSortBy={(value) => {
                setSortBy(value);
                resetPagination();
              }}
            />

            <ProposalsList
              proposals={proposals}
              isLoading={isLoading || isFetching}
            />
            {proposals.length > 0 ? (
              <Pagination
                currentPage={currentPage}
                totalPages={paginatedProposals.totalPage}
                onPageChange={setCurrentPage}
              />
            ) : (
              <ProposalsEmptyState />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
