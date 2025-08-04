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
  getWorkLogsByContractId,
  updateWorkLog,
} from "@/services/work-log";
import { useParams } from "next/navigation";
import { getContractById } from "@/services/contract";
import { WorkLogProps } from "@/types/work-log";
import { InfiniteLoading } from "@/components/common/InfiniteLoading";
import {
  createWorkSubmission,
  getWorkSubmissionsByContractId,
} from "@/services/work-submissions";
import { ContractProps, ContractType } from "@/types/contract";

const mockMilestones = [
  { id: "milestone-1", name: "Project Setup & Planning", status: "completed" },
  { id: "milestone-2", name: "User Authentication", status: "completed" },
  { id: "milestone-3", name: "Product Catalog", status: "in_progress" },
  { id: "milestone-4", name: "Shopping Cart", status: "pending" },
  { id: "milestone-5", name: "Payment Integration", status: "pending" },
];

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

  const [timeEntries, setTimeEntries] = useState<WorkLogProps[]>([]);
  const [submissions, setSubmissions] = useState<WorkSubmissionProps[]>([]);

  const { data: contractWithStats, isLoading: isContractLoading } =
    useQuery<ContractWithStats>({
      queryKey: ["contract", contractId],
      queryFn: () => getContractById(contractId as string),
      enabled: !!contractId,
    });

  const { data: worklogs, isLoading: isWorkLogsLoading } = useQuery<
    WorkLogProps[]
  >({
    queryKey: ["worklogs", contractId],
    queryFn: () => getWorkLogsByContractId(contractId as string),
    enabled: !!contractId,
  });

  const { data: workSubmissions, isLoading: isWorkSubmissionsLoading } =
    useQuery<WorkSubmissionProps[]>({
      queryKey: ["workSubmissions", contractId],
      queryFn: () => getWorkSubmissionsByContractId(contractId as string),
      enabled: !!contractId,
    });

  const createWorkLogMutation = useMutation({
    mutationFn: (workLog: WorkLogProps) => createWorkLog(workLog),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["worklogs", contractId] });
    },
    onError: (error) => {
      console.error("Error creating work log:", error);
    },
  });

  const updateWorkLogMutation = useMutation({
    mutationFn: (workLog: WorkLogProps) => updateWorkLog(workLog.id, workLog),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["worklogs", contractId] });
    },
    onError: (error) => {
      console.error("Error updating work log:", error);
    },
  });

  const createWorkSubmissionMutation = useMutation({
    mutationFn: (submission: CreateWorkSubmissionProps) =>
      createWorkSubmission(submission),
  });

  const handleAddTimeEntry = (workLog: WorkLogProps) => {
    const newEntry = {
      ...workLog,
      loggedAt: workLog.loggedAt || "09:00",
      endTime: workLog.endTime || "17:00",
      hours: workLog.hours || 28800,
      description: workLog.description || "New work session",
    };
    setTimeEntries([newEntry, ...timeEntries]);
  };

  const handleEditTimeEntry = (id: string, updatedEntry: WorkLogProps) => {
    setTimeEntries(
      timeEntries.map((entry) =>
        entry.id === id ? { ...entry, ...updatedEntry } : entry
      )
    );
  };

  const handleDeleteTimeEntry = (id: string) => {
    setTimeEntries(timeEntries.filter((entry) => entry.id !== id));
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

  if (isContractLoading || isWorkLogsLoading || isWorkSubmissionsLoading)
    return <InfiniteLoading />;
  if (!contractWithStats) return;
  if (!worklogs) return;

  const { data: contract, ...rest } = contractWithStats;

  const contractStats = rest;
  console.log(contractStats);

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
          timeEntries={timeEntries}
          submissions={submissions}
          milestones={mockMilestones}
          onAddTimeEntry={handleAddTimeEntry}
          onEditTimeEntry={handleEditTimeEntry}
          onDeleteTimeEntry={handleDeleteTimeEntry}
          onAddSubmission={handleAddSubmission}
          onUpdateSubmission={handleUpdateSubmission}
        />
      </div>
    </div>
  );
}
