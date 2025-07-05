"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Users } from "lucide-react";

interface ClientProposalsHeaderProps {
  proposalsCount: number;
  jobTitle?: string;
}

export function JobDetailsHeader({
  proposalsCount,
}: //   jobTitle,
ClientProposalsHeaderProps) {
  return (
    <div className="border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <a href="/client-dashboard">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Jobs
              </a>
            </Button>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Proposals</h1>
              <p className="text-sm text-gray-600">
                {proposalsCount} proposals received
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" asChild>
              <a href="/client-all-proposals">All My Jobs</a>
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button className="bg-green-600 hover:bg-green-700">
              <Users className="w-4 h-4 mr-2" />
              Invite Freelancers
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
