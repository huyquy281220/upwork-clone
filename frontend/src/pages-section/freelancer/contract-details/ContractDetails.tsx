"use client";

import { useState, useCallback } from "react";
import { ContractHeader } from "./ContractHeader";
import { ClientInfo } from "./ClientInfo";
import { ContractTerms } from "./ContractTerms";
import { MilestonesDisplay } from "./Milestones";
import { ContractActions } from "./ContractActions";
import { ContractSuccess } from "./ContractSuccess";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getClientByContract,
  getContractById,
  updateContract,
} from "@/services/contract";
import { useParams } from "next/navigation";
import { ContractProps, ContractStatus } from "@/types/contract";
import { InfiniteLoading } from "@/components/common/InfiniteLoading";
import { useToast } from "@/hooks/useToast";
import { ModernToast } from "@/components/common/ModernToast";
import { BaseUser } from "@/types/user";

type ContractDataProps = {
  data: ContractProps;
  totalEarning: number;
  weekEarning: number;
  progress: number;
  completedMilestones: number;
  totalMilestones: number;
  totalHoursWorked: number;
};

export type ClientDataProps = {
  client: {
    companyName: string;
    website: string;
    user: BaseUser;
  };
  contractId: string;
  contractTitle: string;
  rating: number;
  reviewCount: number;
  activeHires: number;
  hireRate: number;
  jobPosted: number;
  totalSpent: number;
};

export function ContractDetails() {
  const params = useParams();
  const contractId = params.contractId;
  const queryClient = useQueryClient();

  const [isProcessing, setIsProcessing] = useState(false);
  const [actionCompleted, setActionCompleted] = useState<
    "accepted" | "declined" | "changes-requested" | null
  >(null);

  const { toast, showSuccessToast, showErrorToast, activeToasts } = useToast();

  const { data: contractData, isLoading: isContractDataLoading } =
    useQuery<ContractDataProps>({
      queryKey: ["contract", contractId],
      queryFn: () => getContractById(contractId as string),
      enabled: !!contractId,
    });

  const { data: clientData, isLoading: isClientDataLoading } =
    useQuery<ClientDataProps>({
      queryKey: ["client-by-contract", contractId],
      queryFn: () => getClientByContract(contractId as string),
      enabled: !!contractId,
    });

  const acceptContractMutation = useMutation({
    mutationFn: () =>
      updateContract(contractId as string, {
        clientId: contractData?.data.clientId as string,
        status: ContractStatus.ACTIVE,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contract", contractId] });
      setIsProcessing(false);
      setActionCompleted("accepted");
      showSuccessToast("Your accepted the contract", "", 1200);
    },
    onError: () => {
      showErrorToast("Failed to accept contract", "", 1200);
    },
  });

  const declineContractMutation = useMutation({
    mutationFn: () =>
      updateContract(contractId as string, {
        clientId: contractData?.data.clientId as string,
        status: ContractStatus.CANCELLED,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contract", contractId] });
      setIsProcessing(false);
      setActionCompleted("declined");
      showSuccessToast("You declined the contract", "", 1200);
    },
    onError: () => {
      showErrorToast("Failed to decline contract", "", 1200);
    },
  });

  const handleAccept = useCallback(async () => {
    setIsProcessing(true);
    acceptContractMutation.mutate();
  }, [acceptContractMutation]);

  const handleDecline = useCallback(async () => {
    setIsProcessing(true);
    declineContractMutation.mutate();
  }, [declineContractMutation]);

  const handleRequestChanges = useCallback(async (message: string) => {
    setIsProcessing(true);
    // Simulate API call
    console.log("Requesting changes:", message);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsProcessing(false);
    setActionCompleted("changes-requested");
  }, []);

  if (isContractDataLoading || isClientDataLoading) return <InfiniteLoading />;

  if (!contractData || !clientData) return;

  const contract = contractData.data;

  if (actionCompleted) {
    return (
      <ContractSuccess
        action={actionCompleted}
        clientName={clientData.client.user.fullName as string}
        contractTitle={contract.title}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <ContractHeader
        contractTitle={contract.title}
        clientName={clientData.client.user.fullName as string}
        status={contract.status as ContractStatus}
        sentDate={contract.createdAt}
        // expiresDate={contract.expiresAt}
      />

      <div className="max-w-7xl mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="space-y-8">
              <ContractTerms contract={contract} />

              <MilestonesDisplay
                milestones={contract.milestones || []}
                contractType={contract.contractType}
              />

              <ContractActions
                contractStatus={contract.status}
                onAccept={handleAccept}
                onDecline={handleDecline}
                onRequestChanges={handleRequestChanges}
                isProcessing={isProcessing}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <ClientInfo {...clientData} sentDate={contract.createdAt} />
          </div>
        </div>
      </div>

      {activeToasts && <ModernToast {...toast} />}
    </div>
  );
}
