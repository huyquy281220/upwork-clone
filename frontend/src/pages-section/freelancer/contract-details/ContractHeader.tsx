"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ContractStatus } from "@/types/contract";
import { getContractStatusColor } from "@/utils/getStatusColor";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface ContractHeaderProps {
  contractTitle: string;
  clientName: string;
  status: ContractStatus;
  sentDate: string;
  // expiresDate: string;
}

export function ContractHeader({ clientName, status }: ContractHeaderProps) {
  const router = useRouter();

  return (
    <div className="bg-background">
      <div className="w-full max-w-[80rem] mx-auto border-b">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Button
              className="relative text-white"
              onClick={() => router.back()}
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <div>
              <h1 className="text-xl font-semibold text-foreground">
                Contract Offer
              </h1>
              <p className="text-sm text-foreground">From {clientName}</p>
            </div>
          </div>
          <Badge className={getContractStatusColor(status)}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
      </div>
    </div>
  );
}
