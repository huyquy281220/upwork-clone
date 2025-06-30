"use client";

import { Button } from "@/components/ui/button";

interface ProposalsHeaderProps {
  statusCounts: {
    active: number;
    interviewing: number;
    submitted: number;
    declined: number;
  };
}

export function ProposalsHeader({ statusCounts }: ProposalsHeaderProps) {
  return (
    <div className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-semibold text-gray-900">
              My Proposals
            </h1>
            <div className="flex space-x-6">
              <span className="text-sm text-gray-600">
                Active ({statusCounts.active})
              </span>
              <span className="text-sm text-gray-600">
                Interviewing ({statusCounts.interviewing})
              </span>
              <span className="text-sm text-gray-600">
                Submitted ({statusCounts.submitted})
              </span>
              <span className="text-sm text-gray-600">
                Declined ({statusCounts.declined})
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" asChild>
              <a href="/best-matches">Best Matches</a>
            </Button>
            <Button variant="outline" asChild>
              <a href="/contracts">View Contracts</a>
            </Button>
            <Button variant="outline" asChild>
              <a href="/client-proposals">View as Client</a>
            </Button>
            <Button variant="outline" asChild>
              <a href="/client-all-proposals">All My Jobs</a>
            </Button>
            <Button className="bg-green-600 hover:bg-green-700">
              Find Work
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
