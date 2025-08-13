"use client";

import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

interface ContractHeaderProps {
  contractTitle: string;
  clientName: string;
  status: "pending" | "accepted" | "declined" | "expired";
  sentDate: string;
  expiresDate: string;
}

export function ContractHeader({
  clientName,
  status,
  expiresDate,
}: ContractHeaderProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "accepted":
        return "bg-green-100 text-green-800 border-green-200";
      case "declined":
        return "bg-red-100 text-red-800 border-red-200";
      case "expired":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTimeRemaining = (expiresDate: string) => {
    const now = new Date();
    const expires = new Date(expiresDate);
    const diffTime = expires.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) return "Expired";
    if (diffDays === 1) return "1 day remaining";
    return `${diffDays} days remaining`;
  };

  return (
    <div className="bg-background">
      <div className="max-w-[80rem] mx-auto border-b">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            {/* <Button variant="ghost" size="sm" asChild>
              <a href="/contracts">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Contracts
              </a>
            </Button> */}
            <div>
              <h1 className="text-xl font-semibold text-foreground">
                Contract Offer
              </h1>
              <p className="text-sm text-foreground">From {clientName}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Badge className={getStatusColor(status)}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
            {status === "pending" && (
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{getTimeRemaining(expiresDate)}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
