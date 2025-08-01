"use client";

import { useState } from "react";
import { WorkLogTabs } from "./components/WorkLogTabs";
import { WorkLogHeader } from "./WorkLogHeader";
import { WorkSubmissionProps } from "@/types/work-submissions";
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

// Mock data
const mockContract = {
  id: "contract-1",
  title: "E-commerce Website Development",
  clientName: "TechCorp Inc.",
  type: "hourly" as const,
  hourlyRate: 75,
  totalBudget: 15000,
  status: "active",
  startDate: "2024-01-15",
  endDate: "2024-04-15",
};

const mockStats = {
  totalHoursWorked: 127.5,
  totalEarnings: 9562.5,
  thisWeekHours: 32.5,
  thisWeekEarnings: 2437.5,
  averageHoursPerDay: 6.5,
  hourlyRate: 75,
  completedMilestones: 3,
  totalMilestones: 5,
};

const mockMilestones = [
  { id: "milestone-1", name: "Project Setup & Planning", status: "completed" },
  { id: "milestone-2", name: "User Authentication", status: "completed" },
  { id: "milestone-3", name: "Product Catalog", status: "in_progress" },
  { id: "milestone-4", name: "Shopping Cart", status: "pending" },
  { id: "milestone-5", name: "Payment Integration", status: "pending" },
];

export function WorkLogPage() {
  const params = useParams();
  const contractId = params.contractId;
  const queryClient = useQueryClient();

  console.log(contractId);

  const [timeEntries, setTimeEntries] = useState<WorkLogProps[]>([]);
  const [submissions, setSubmissions] = useState<WorkSubmissionProps[]>([]);

  const { data: contract, isLoading: isContractLoading } = useQuery({
    queryKey: ["contract", contractId],
    queryFn: () => getContractById(contractId || ""),
    enabled: !!contractId,
  });

  const { data: worklogs, isLoading: isWorkLogsLoading } = useQuery({
    queryKey: ["worklogs", contractId],
    queryFn: () => getWorkLogsByContractId(contractId || ""),
    enabled: !!contractId,
  });

  console.log("worklogs", worklogs);

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

  console.log("worklogs", worklogs);

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
    const newSubmission = {
      id: `submission-${Date.now()}`,
      title: submission.title || "New Submission",
      description: submission.description || "",
      submittedDate: new Date().toISOString().split("T")[0],
      status: "draft" as const,
      files: [],
      ...submission,
    };
    setSubmissions([newSubmission, ...submissions]);
  };

  const handleUpdateSubmission = (id: string, updatedSubmission: any) => {
    setSubmissions(
      submissions.map((sub) =>
        sub.id === id ? { ...sub, ...updatedSubmission } : sub
      )
    );
  };

  if (isContractLoading || isWorkLogsLoading) return <InfiniteLoading />;
  if (!contract) return;
  if (!worklogs) return;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <WorkLogHeader
          contract={mockContract}
          isTimerRunning={false}
          currentSession={null}
          onStartTimer={() => {}}
          onPauseTimer={() => {}}
          onStopTimer={() => {}}
        />

        <WorkLogTabs
          contractType={contract.contractType}
          stats={mockStats}
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
