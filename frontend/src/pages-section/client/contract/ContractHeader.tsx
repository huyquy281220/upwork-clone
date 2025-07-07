"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface ContractHeaderProps {
  freelancerName: string;
  jobTitle: string;
}

export function ContractHeader({
  freelancerName,
  jobTitle,
}: ContractHeaderProps) {
  return (
    <div className="border-b">
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          <Button variant="ghost" size="sm" asChild className="mr-4">
            <Link href="/client-proposals">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Proposals
            </Link>
          </Button>
          <div>
            <h1 className="text-xl font-semibold text-foreground">
              Create Contract
            </h1>
            <p className="text-sm text-foreground opacity-80">
              Hiring {freelancerName} for &#34;{jobTitle}&#34;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
