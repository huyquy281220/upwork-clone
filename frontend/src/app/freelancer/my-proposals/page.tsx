"use client";

import { Pagination } from "@/components/common/Pagination";
import useFilter from "@/hooks/useFilter";
import {
  ProposalsEmptyState,
  ProposalsFilters,
  ProposalsHeader,
  ProposalsList,
  ProposalsSearchSort,
} from "@/pages-section/freelancer/Proposals/my-proposals";
import { getPaginatedProposalsByFreelancer } from "@/services/proposals";
import { ProposalProps } from "@/types/proposals";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

interface PaginatedProposalsProps {
  data: ProposalProps[];
  totalPage: number;
  totalProposals: number;
}

const ITEMS_PER_PAGE = 5;

export default function ProposalsPage() {
  const { data: session } = useSession();

  const { getFilter, setFilter, resetFilters } = useFilter({
    search: "",
    status: "all",
    sortBy: "newest",
    date: "all",
    budget: "all",
    page: "1",
  });

  const searchQuery = getFilter("search");
  const statusFilter = getFilter("status");
  const sortBy = getFilter("sortBy");
  const dateFilter = getFilter("date");
  const budgetRangeFilter = getFilter("budget");
  const currentPage = parseInt(getFilter("page"));

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
      getPaginatedProposalsByFreelancer(
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

  const resetPagination = () => setFilter("page", "1");

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
                setFilter("status", value);
                resetPagination();
              }}
              dateFilter={dateFilter}
              setDateFilter={(value) => {
                setFilter("date", value);
                resetPagination();
              }}
              budgetRangeFilter={budgetRangeFilter}
              setBudgetRangeFilter={(value) => {
                setFilter("budget", value);
                resetPagination();
              }}
              statusCounts={statusCounts}
              // filteredCount={filteredProposals.length}
              onClearFilters={resetFilters}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <ProposalsSearchSort
              setSearchQuery={(value) => setFilter("search", value)}
              sortBy={sortBy}
              setSortBy={(value) => {
                setFilter("sortBy", value);
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
                onPageChange={(value) => setFilter("page", value.toString())}
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
