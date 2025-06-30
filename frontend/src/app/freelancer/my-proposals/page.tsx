"use client";

import { Pagination } from "@/components/common/Pagination";
import {
  ProposalsEmptyState,
  ProposalsFilters,
  ProposalsHeader,
  ProposalsList,
  ProposalsSearchSort,
} from "@/pages-section/freelancer/Proposals/my-proposals";
import { useState } from "react";
// Enhanced sample proposals data with more entries
const allProposals = [
  {
    id: 1,
    jobTitle: "Full Stack Developer for E-commerce Platform",
    client: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      location: "United States",
      rating: 4.9,
      totalSpent: "$50K+",
      verified: true,
    },
    status: "Active",
    submittedDate: "2 days ago",
    submittedDateSort: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    budget: "$3,000 - $5,000",
    budgetValue: 4000,
    proposalRate: "$45/hr",
    proposalRateValue: 45,
    coverLetter:
      "Hi Sarah, I'm excited about your e-commerce project. With 5+ years of experience in React, Node.js, and payment integrations...",
    connects: 6,
    boosted: false,
    viewed: true,
    interviewing: false,
    category: "Web Development",
  },
  {
    id: 2,
    jobTitle: "Mobile App UI/UX Designer Needed",
    client: {
      name: "Tech Startup Inc",
      avatar: "/placeholder.svg?height=40&width=40",
      location: "Canada",
      rating: 4.7,
      totalSpent: "$25K+",
      verified: true,
    },
    status: "Interviewing",
    submittedDate: "5 days ago",
    submittedDateSort: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    budget: "Fixed: $2,500",
    budgetValue: 2500,
    proposalRate: "$2,200",
    proposalRateValue: 2200,
    coverLetter:
      "Hello! I specialize in mobile app design with a focus on user experience. My portfolio includes 20+ successful apps...",
    connects: 4,
    boosted: true,
    viewed: true,
    interviewing: true,
    category: "Design & Creative",
  },
  {
    id: 3,
    jobTitle: "WordPress Website Development",
    client: {
      name: "Marketing Agency Pro",
      avatar: "/placeholder.svg?height=40&width=40",
      location: "United Kingdom",
      rating: 4.5,
      totalSpent: "$10K+",
      verified: false,
    },
    status: "Submitted",
    submittedDate: "1 week ago",
    submittedDateSort: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    budget: "$800 - $1,500",
    budgetValue: 1150,
    proposalRate: "$35/hr",
    proposalRateValue: 35,
    coverLetter:
      "I'd love to help you build a professional WordPress website. I have extensive experience with custom themes...",
    connects: 3,
    boosted: false,
    viewed: false,
    interviewing: false,
    category: "Web Development",
  },
  {
    id: 4,
    jobTitle: "Data Analysis and Visualization Expert",
    client: {
      name: "Research Institute",
      avatar: "/placeholder.svg?height=40&width=40",
      location: "Australia",
      rating: 4.8,
      totalSpent: "$75K+",
      verified: true,
    },
    status: "Declined",
    submittedDate: "2 weeks ago",
    submittedDateSort: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    budget: "$1,200 - $2,000",
    budgetValue: 1600,
    proposalRate: "$40/hr",
    proposalRateValue: 40,
    coverLetter:
      "I'm a data scientist with expertise in Python, R, and advanced visualization tools like Tableau and D3.js...",
    connects: 5,
    boosted: false,
    viewed: true,
    interviewing: false,
    category: "Data Science & Analytics",
  },
  {
    id: 5,
    jobTitle: "Social Media Marketing Campaign",
    client: {
      name: "Fashion Brand Co",
      avatar: "/placeholder.svg?height=40&width=40",
      location: "France",
      rating: 4.6,
      totalSpent: "$15K+",
      verified: true,
    },
    status: "Active",
    submittedDate: "3 days ago",
    submittedDateSort: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    budget: "Fixed: $1,800",
    budgetValue: 1800,
    proposalRate: "$1,650",
    proposalRateValue: 1650,
    coverLetter:
      "I can help you create engaging social media campaigns that drive results. My experience includes...",
    connects: 4,
    boosted: true,
    viewed: true,
    interviewing: false,
    category: "Sales & Marketing",
  },
  {
    id: 6,
    jobTitle: "Python Backend API Development",
    client: {
      name: "FinTech Solutions",
      avatar: "/placeholder.svg?height=40&width=40",
      location: "Germany",
      rating: 4.9,
      totalSpent: "$100K+",
      verified: true,
    },
    status: "Interviewing",
    submittedDate: "1 week ago",
    submittedDateSort: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    budget: "$4,000 - $7,000",
    budgetValue: 5500,
    proposalRate: "$55/hr",
    proposalRateValue: 55,
    coverLetter:
      "I have extensive experience building scalable APIs with Python and Django. I can help you...",
    connects: 6,
    boosted: false,
    viewed: true,
    interviewing: true,
    category: "Web Development",
  },
  {
    id: 7,
    jobTitle: "Content Writing for Tech Blog",
    client: {
      name: "DevBlog Media",
      avatar: "/placeholder.svg?height=40&width=40",
      location: "India",
      rating: 4.3,
      totalSpent: "$5K+",
      verified: false,
    },
    status: "Submitted",
    submittedDate: "4 days ago",
    submittedDateSort: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    budget: "Fixed: $600",
    budgetValue: 600,
    proposalRate: "$550",
    proposalRateValue: 550,
    coverLetter:
      "I'm a technical writer with experience in creating engaging content for developer audiences...",
    connects: 2,
    boosted: false,
    viewed: false,
    interviewing: false,
    category: "Writing & Translation",
  },
  {
    id: 8,
    jobTitle: "React Native Mobile App",
    client: {
      name: "Startup Ventures",
      avatar: "/placeholder.svg?height=40&width=40",
      location: "Singapore",
      rating: 4.7,
      totalSpent: "$30K+",
      verified: true,
    },
    status: "Active",
    submittedDate: "6 days ago",
    submittedDateSort: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    budget: "Fixed: $3,500",
    budgetValue: 3500,
    proposalRate: "$3,200",
    proposalRateValue: 3200,
    coverLetter:
      "I specialize in React Native development and have built 15+ mobile apps. I can deliver...",
    connects: 5,
    boosted: false,
    viewed: true,
    interviewing: false,
    category: "Mobile Development",
  },
  {
    id: 9,
    jobTitle: "DevOps and Cloud Infrastructure",
    client: {
      name: "CloudTech Corp",
      avatar: "/placeholder.svg?height=40&width=40",
      location: "Netherlands",
      rating: 4.8,
      totalSpent: "$80K+",
      verified: true,
    },
    status: "Declined",
    submittedDate: "3 weeks ago",
    submittedDateSort: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000),
    budget: "$5,000 - $8,000",
    budgetValue: 6500,
    proposalRate: "$65/hr",
    proposalRateValue: 65,
    coverLetter:
      "I'm a DevOps engineer with expertise in AWS, Docker, and Kubernetes. I can help you...",
    connects: 7,
    boosted: false,
    viewed: true,
    interviewing: false,
    category: "IT & Networking",
  },
  {
    id: 10,
    jobTitle: "Graphic Design for Brand Identity",
    client: {
      name: "Creative Agency",
      avatar: "/placeholder.svg?height=40&width=40",
      location: "Brazil",
      rating: 4.4,
      totalSpent: "$12K+",
      verified: false,
    },
    status: "Submitted",
    submittedDate: "5 days ago",
    submittedDateSort: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    budget: "Fixed: $1,200",
    budgetValue: 1200,
    proposalRate: "$1,100",
    proposalRateValue: 1100,
    coverLetter:
      "I'm a graphic designer with 8+ years of experience in brand identity design. I can create...",
    connects: 3,
    boosted: false,
    viewed: false,
    interviewing: false,
    category: "Design & Creative",
  },
  {
    id: 11,
    jobTitle: "Machine Learning Model Development",
    client: {
      name: "AI Research Lab",
      avatar: "/placeholder.svg?height=40&width=40",
      location: "United States",
      rating: 4.9,
      totalSpent: "$200K+",
      verified: true,
    },
    status: "Active",
    submittedDate: "1 day ago",
    submittedDateSort: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    budget: "$8,000 - $12,000",
    budgetValue: 10000,
    proposalRate: "$80/hr",
    proposalRateValue: 80,
    coverLetter:
      "I'm a machine learning engineer with PhD in Computer Science. I have experience with...",
    connects: 8,
    boosted: true,
    viewed: false,
    interviewing: false,
    category: "Data Science & Analytics",
  },
  {
    id: 12,
    jobTitle: "E-commerce Store Setup",
    client: {
      name: "Retail Business",
      avatar: "/placeholder.svg?height=40&width=40",
      location: "Canada",
      rating: 4.2,
      totalSpent: "$8K+",
      verified: false,
    },
    status: "Submitted",
    submittedDate: "2 weeks ago",
    submittedDateSort: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    budget: "Fixed: $2,000",
    budgetValue: 2000,
    proposalRate: "$1,850",
    proposalRateValue: 1850,
    coverLetter:
      "I can help you set up a complete e-commerce store with payment integration and inventory management...",
    connects: 4,
    boosted: false,
    viewed: true,
    interviewing: false,
    category: "Web Development",
  },
];

export default function ProposalsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [dateFilter, setDateFilter] = useState("all");
  const [budgetRangeFilter, setBudgetRangeFilter] = useState("all");

  const ITEMS_PER_PAGE = 5;

  // Filter and sort logic
  const filteredProposals = allProposals.filter((proposal) => {
    // Status filter
    if (
      statusFilter !== "all" &&
      proposal.status.toLowerCase() !== statusFilter
    )
      return false;

    // Search filter
    if (
      searchQuery &&
      !proposal.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !proposal.client.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;

    // Date filter
    if (dateFilter !== "all") {
      const daysDiff = Math.floor(
        (Date.now() - proposal.submittedDateSort.getTime()) /
          (1000 * 60 * 60 * 24)
      );
      switch (dateFilter) {
        case "today":
          if (daysDiff > 0) return false;
          break;
        case "week":
          if (daysDiff > 7) return false;
          break;
        case "month":
          if (daysDiff > 30) return false;
          break;
        case "quarter":
          if (daysDiff > 90) return false;
          break;
      }
    }

    // Budget filter
    if (budgetRangeFilter !== "all") {
      switch (budgetRangeFilter) {
        case "under-1k":
          if (proposal.budgetValue >= 1000) return false;
          break;
        case "1k-5k":
          if (proposal.budgetValue < 1000 || proposal.budgetValue > 5000)
            return false;
          break;
        case "5k-10k":
          if (proposal.budgetValue < 5000 || proposal.budgetValue > 10000)
            return false;
          break;
        case "over-10k":
          if (proposal.budgetValue <= 10000) return false;
          break;
      }
    }

    return true;
  });

  // Sort logic
  const sortedProposals = [...filteredProposals].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return b.submittedDateSort.getTime() - a.submittedDateSort.getTime();
      case "oldest":
        return a.submittedDateSort.getTime() - b.submittedDateSort.getTime();
      case "budget-high":
        return b.budgetValue - a.budgetValue;
      case "budget-low":
        return a.budgetValue - b.budgetValue;
      case "rate-high":
        return b.proposalRateValue - a.proposalRateValue;
      case "rate-low":
        return a.proposalRateValue - b.proposalRateValue;
      default:
        return 0;
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedProposals.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProposals = sortedProposals.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // Status counts
  const statusCounts = {
    active: allProposals.filter((p) => p.status === "Active").length,
    interviewing: allProposals.filter((p) => p.status === "Interviewing")
      .length,
    submitted: allProposals.filter((p) => p.status === "Submitted").length,
    declined: allProposals.filter((p) => p.status === "Declined").length,
  };

  // Reset pagination when filters change
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
      <ProposalsHeader totalProposal={0} />

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
              filteredCount={filteredProposals.length}
              onClearFilters={handleClearFilters}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <ProposalsSearchSort
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              sortBy={sortBy}
              setSortBy={(value) => {
                setSortBy(value);
                resetPagination();
              }}
            />

            {sortedProposals.length > 0 ? (
              <>
                <ProposalsList proposals={paginatedProposals} />
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </>
            ) : (
              <ProposalsEmptyState onClearFilters={handleClearFilters} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
