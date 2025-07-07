"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface ContractHeaderProps {
  freelancerName: string;
  jobTitle: string;
}

export function ContractHeader({
  freelancerName,
  jobTitle,
}: ContractHeaderProps) {
  return (
    <div className="bg-white border-b">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          <Button variant="ghost" size="sm" asChild className="mr-4">
            <a href="/client-proposals">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Proposals
            </a>
          </Button>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              Create Contract
            </h1>
            <p className="text-sm text-gray-600">
              Hiring {freelancerName} for "{jobTitle}"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
