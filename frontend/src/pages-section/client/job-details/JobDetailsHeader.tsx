"use client";

// import { Button } from "@/components/ui/button";
// import { ArrowLeft } from "lucide-react";

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
            {/* <Button variant="ghost" size="sm" asChild>
              <a href="/client-dashboard">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Jobs
              </a>
            </Button> */}
            <div>
              <h1 className="text-xl font-semibold text-foreground">
                Proposals
              </h1>
              <p className="text-sm text-gray-400">
                {proposalsCount} proposals received
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
