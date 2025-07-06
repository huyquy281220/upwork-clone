"use client";

import { Pagination } from "@/components/common/Pagination";
import { useModalManager } from "@/hooks/useModalManager";
import {
  FreelancerDetailsModal,
  JobDetailsHeader,
  JobDetailsSidebar,
  ProposalsFilters,
  ProposalsList,
} from "@/pages-section/client/job-details";
import { getJobById } from "@/services/jobs";
import { getPaginatedProposalsByJob } from "@/services/proposals";
import { ProposalProps } from "@/types/proposals";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useState } from "react";

interface PaginatedProposalsProps {
  data: ProposalProps[];
  totalProposals: number;
  totalPage: number;
}

export default function ClientProposalsPage() {
  const params = useParams();
  const jobId = params.jobId as string;

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [filterBy, setFilterBy] = useState("all");
  const [selectedProposal, setSelectedProposal] = useState<ProposalProps>();

  const { closeModal, isModalOpen, openModal } = useModalManager();

  const { data: jobDetail } = useQuery({
    queryKey: ["job-detail", jobId],
    queryFn: () => getJobById(jobId),
    enabled: !!jobId,
  });

  const { data: paginatedProposals } = useQuery<PaginatedProposalsProps>({
    queryKey: ["paginated-proposals-by-job", jobId],
    queryFn: () =>
      getPaginatedProposalsByJob(jobId, 5, currentPage, searchQuery),
    enabled: !!jobId,
  });

  const handleViewDetails = (proposal: ProposalProps) => {
    openModal("freelancer-details");
    setSelectedProposal(proposal);
  };

  // const handleMessage = (proposal: ProposalProps) => {
  //   setSelectedProposal(proposal);
  // };
  if (!paginatedProposals || !jobDetail) return;

  return (
    <div className="min-h-screen">
      <JobDetailsHeader
        proposalsCount={paginatedProposals?.totalProposals}
        jobTitle={jobDetail.title}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Job Details Sidebar */}
          <div className="lg:col-span-1">
            <JobDetailsSidebar jobData={jobDetail} />
          </div>

          {/* Proposals List */}
          <div className="lg:col-span-3">
            <ProposalsFilters
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              sortBy={sortBy}
              setSortBy={setSortBy}
              filterBy={filterBy}
              setFilterBy={setFilterBy}
            />

            <ProposalsList
              proposals={paginatedProposals.data}
              onViewDetails={handleViewDetails}
              // onMessage={handleMessage}
            />

            <Pagination
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              totalPages={paginatedProposals.totalPage}
            />
          </div>
        </div>
      </div>

      {/* Modals */}
      {selectedProposal && (
        <FreelancerDetailsModal
          proposal={selectedProposal}
          // jobData={jobData}
          isOpen={isModalOpen("freelancer-details")}
          onClose={() => closeModal()}
          // onMessage={() => setMessageModalOpen(true)}
        />
      )}
    </div>
  );
}
