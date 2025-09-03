"use client";

import { useQuery } from "@tanstack/react-query";
import { ContractProgressTabs } from "./ContractProgressTabs";
import { ContractProgressHeader } from "./ContractProgressHeader";
import { getClientByContract } from "@/services/contract";
import { useParams } from "next/navigation";
import { ClientByContractProps } from "@/types/contract";
import { InfiniteLoading } from "@/components/common/InfiniteLoading";

export function ContractProgressPage() {
  const params = useParams();
  const contractId = params.contractId;

  const { data: clientByContract, isLoading } = useQuery<ClientByContractProps>(
    {
      queryKey: ["client-by-contract", contractId],
      queryFn: () => getClientByContract(contractId as string),
      enabled: !!contractId,
    }
  );

  if (isLoading) return <InfiniteLoading />;
  if (!clientByContract) return;

  const { contract, ...clientData } = clientByContract;

  return (
    <div className="min-h-screen bg-background">
      <ContractProgressHeader
        contract={contract}
        rating={clientData.rating}
        totalPaid={clientData.totalPaid}
      />
      <ContractProgressTabs contract={contract} {...clientData} />
    </div>
  );
}
