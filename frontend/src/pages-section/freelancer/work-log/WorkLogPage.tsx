"use client";

import { useState } from "react";
import { WorkLogTabs } from "./components/WorkLogTabs";
import { WorkLogHeader } from "./WorkLogHeader";
import {
  UpdateWorkSubmissionProps,
  WorkSubmissionProps,
} from "@/types/work-submissions";
import { CreateWorkSubmissionProps } from "@/types/work-submissions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createWorkLog,
  deleteWorkLog,
  updateWorkLog,
} from "@/services/work-log";
import { useParams } from "next/navigation";
import { getContractById } from "@/services/contract";
import { CreateWorkLogProps, WorkLogProps } from "@/types/work-log";
import { InfiniteLoading } from "@/components/common/InfiniteLoading";
import { createWorkSubmission } from "@/services/work-submissions";
import { ContractProps, ContractType } from "@/types/contract";
import { useToast } from "@/hooks/useToast";
import { ModernToast } from "@/components/common/ModernToast";
import { useUser } from "@/hooks/useUserInfo";
import { useSession } from "next-auth/react";
import { FreelancerUser } from "@/types/user";

type ContractWithStats = {
  data: ContractProps;
  totalEarning: number;
  weekEarning: number;
  progress: number;
  completedMilestones: number;
  totalMilestones: number;
  totalHoursWorked: number;
};

export function WorkLogPage() {
  const params = useParams();
  const contractId = params.contractId;
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  const { data: freelancer } = useUser<FreelancerUser>(
    session?.user.id as string
  );

  const { toast, showSuccessToast, showErrorToast, activeToasts } = useToast();

  const [submissions, setSubmissions] = useState<WorkSubmissionProps[]>([]);

  const { data: contractWithStats, isLoading: isContractLoading } =
    useQuery<ContractWithStats>({
      queryKey: ["contract-with-stats", contractId],
      queryFn: () => getContractById(contractId as string),
      enabled: !!contractId,
    });

  const createWorkLogMutation = useMutation({
    mutationFn: (workLog: CreateWorkLogProps) => createWorkLog(workLog),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["contract-with-stats", contractId],
      });
      showSuccessToast(
        "Work log created",
        "Your work log has been created",
        1500
      );
    },
    onError: (error) => {
      console.error("Error creating work log:", error);
      showErrorToast("Failed to create work log", "Please try again", 1500);
    },
  });

  const updateWorkLogMutation = useMutation({
    mutationFn: (workLog: Partial<WorkLogProps>) =>
      updateWorkLog(workLog.id as string, workLog),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["contract-with-stats", contractId],
      });
      showSuccessToast(
        "Work log updated",
        "Your work log has been updated",
        1500
      );
    },
    onError: (error) => {
      console.error("Error updating work log:", error);
      showErrorToast("Failed to update work log", "Please try again", 1500);
    },
  });

  const deleteWorkLogMutation = useMutation({
    mutationFn: (id: string) => deleteWorkLog(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["contract-with-stats", contractId],
      });
      showSuccessToast(
        "Work log deleted",
        "Your work log has been deleted",
        1500
      );
    },
    onError: (error) => {
      console.error("Error deleting work log:", error);
      showErrorToast("Failed to delete work log", "Please try again", 1500);
    },
  });

  const createWorkSubmissionMutation = useMutation({
    mutationFn: (submission: CreateWorkSubmissionProps) =>
      createWorkSubmission(submission),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["contract-with-stats", contractId],
      });
      showSuccessToast(
        "Work submission created",
        "Your work submission has been created",
        1500
      );
    },
    onError: (error) => {
      console.error("Error creating work submission:", error);
      showErrorToast(
        "Failed to create work submission",
        "Please try again",
        1500
      );
    },
  });

  const handleAddTimeEntry = (workLog: CreateWorkLogProps) => {
    createWorkLogMutation.mutate({
      ...workLog,
      contractId: contractId as string,
      freelancerId: freelancer?.id as string,
    });
  };

  const handleEditTimeEntry = (
    id: string,
    updatedEntry: Partial<WorkLogProps>
  ) => {
    updateWorkLogMutation.mutate({
      ...updatedEntry,
      id,
      contractId: contractId as string,
      freelancerId: freelancer?.id as string,
    });
  };

  const handleDeleteTimeEntry = (id: string) => {
    deleteWorkLogMutation.mutate(id);
  };

  const handleAddSubmission = (submission: CreateWorkSubmissionProps) => {
    createWorkSubmissionMutation.mutate(submission);
  };

  const handleUpdateSubmission = (
    id: string,
    updatedSubmission: UpdateWorkSubmissionProps
  ) => {
    setSubmissions(
      submissions.map((sub) =>
        sub.id === id ? { ...sub, ...updatedSubmission } : sub
      )
    );
  };

  if (isContractLoading || !session) return <InfiniteLoading />;
  if (!contractWithStats) return;

  const { data: contract, ...rest } = contractWithStats;

  const contractStats = rest;
  const canCreateSubmission =
    contract.contractType === ContractType.HOURLY &&
    (contract.workLog?.length ?? 0) > 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <WorkLogHeader
          contract={contract}
          // isTimerRunning={false}
          // currentSession={null}
        />

        <WorkLogTabs
          contractType={contract.contractType as ContractType}
          stats={contractStats}
          timeEntries={contract.workLog ?? []}
          submissions={contract.workSubmission ?? []}
          milestones={contract.milestones ?? []}
          hourlyRate={contract.hourlyRate ?? 0}
          onAddTimeEntry={handleAddTimeEntry}
          onEditTimeEntry={handleEditTimeEntry}
          onDeleteTimeEntry={handleDeleteTimeEntry}
          onAddSubmission={handleAddSubmission}
          onUpdateSubmission={handleUpdateSubmission}
          canCreateSubmission={canCreateSubmission}
        />

        {activeToasts && <ModernToast {...toast} />}
      </div>
    </div>
  );
}
