import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ContractStatus } from "@/types/contract";
import { ArrowLeft } from "lucide-react";

interface ContractHeaderProps {
  contractTitle: string;
  clientName: string;
  status: ContractStatus;
  sentDate: string;
  // expiresDate: string;
}

export function ContractHeader({
  clientName,
  status,
}: // expiresDate,
ContractHeaderProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case ContractStatus.PENDING:
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case ContractStatus.ACTIVE:
        return "bg-green-100 text-green-800 border-green-200";
      case ContractStatus.CANCELLED:
        return "bg-red-100 text-red-800 border-red-200";
      // case "expired":
      //   return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // const getTimeRemaining = (expiresDate: string) => {
  //   const now = new Date();
  //   const expires = new Date(expiresDate);
  //   const diffTime = expires.getTime() - now.getTime();
  //   const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  //   if (diffDays <= 0) return "Expired";
  //   if (diffDays === 1) return "1 day remaining";
  //   return `${diffDays} days remaining`;
  // };

  return (
    <div className="bg-background">
      <div className="w-full max-w-[80rem] mx-auto border-b">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Button className="relative text-white">
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
          <Badge className={getStatusColor(status)}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
      </div>
    </div>
  );
}
