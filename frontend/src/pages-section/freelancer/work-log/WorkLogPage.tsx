"use client";

import { useState } from "react";
import { WorkLogTabs } from "./components/WorkLogTabs";
import { WorkLogHeader } from "./WorkLogHeader";
import { CreateWorkSubmissionProps } from "@/types/work-submissions";
import { useQuery } from "@tanstack/react-query";
import { getWorkLogsByContractId } from "@/services/work-log";
import { useSearchParams } from "next/navigation";
import { getContractById } from "@/services/contract";

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

const mockTimeEntries = [
  {
    id: "entry-1",
    date: "2024-01-30",
    startTime: "09:00",
    endTime: "17:00",
    duration: 28800, // 8 hours in seconds
    description: "Frontend development - user authentication",
    hourlyRate: 75,
    earnings: 600,
    status: "approved" as const,
  },
  {
    id: "entry-2",
    date: "2024-01-29",
    startTime: "10:00",
    endTime: "16:30",
    duration: 23400, // 6.5 hours in seconds
    description: "API integration and testing",
    hourlyRate: 75,
    earnings: 487.5,
    status: "submitted" as const,
  },
  {
    id: "entry-3",
    date: "2024-01-28",
    startTime: "09:30",
    endTime: "18:00",
    duration: 30600, // 8.5 hours in seconds
    description: "Database design and implementation",
    hourlyRate: 75,
    earnings: 637.5,
    status: "draft" as const,
  },
];

const mockSubmissions = [
  {
    id: "submission-1",
    title: "User Authentication System",
    description:
      "Complete user registration, login, and password reset functionality",
    submittedDate: "2024-01-28",
    status: "approved" as const,
    files: [
      {
        id: "file-1",
        name: "auth-system.zip",
        size: 2048576,
        type: "application/zip",
        url: "/files/auth-system.zip",
      },
    ],
    feedback: "Great work! The authentication system works perfectly.",
  },
  {
    id: "submission-2",
    title: "Product Catalog API",
    description: "RESTful API for product management with CRUD operations",
    submittedDate: "2024-01-25",
    status: "revision_requested" as const,
    files: [
      {
        id: "file-2",
        name: "api-documentation.pdf",
        size: 1024000,
        type: "application/pdf",
        url: "/files/api-docs.pdf",
      },
    ],
    feedback: "Please add input validation for the product creation endpoint.",
  },
];

const mockMilestones = [
  { id: "milestone-1", name: "Project Setup & Planning", status: "completed" },
  { id: "milestone-2", name: "User Authentication", status: "completed" },
  { id: "milestone-3", name: "Product Catalog", status: "in_progress" },
  { id: "milestone-4", name: "Shopping Cart", status: "pending" },
  { id: "milestone-5", name: "Payment Integration", status: "pending" },
];

export function WorkLogPage() {
  const searchParams = useSearchParams();
  const contractId = searchParams.get("contractId");
  const [timeEntries, setTimeEntries] = useState(mockTimeEntries);
  const [submissions, setSubmissions] = useState(mockSubmissions);

  const { data: contract } = useQuery({
    queryKey: ["contract", contractId],
    queryFn: () => getContractById(contractId || ""),
    enabled: !!contractId,
  });

  // console.log(contract);

  const { data: worklogs } = useQuery({
    queryKey: ["worklogs", contractId],
    queryFn: () => getWorkLogsByContractId(contractId || ""),
    enabled: !!contractId,
  });

  console.log("worklogs", worklogs);

  const handleAddTimeEntry = (entry: any) => {
    const newEntry = {
      startTime: entry.startTime || "09:00",
      endTime: entry.endTime || "17:00",
      duration: entry.duration || 28800,
      description: entry.description || "New work session",
      ...entry,
    };
    setTimeEntries([newEntry, ...timeEntries]);
  };

  const handleEditTimeEntry = (id: string, updatedEntry: any) => {
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
          contractType={mockContract.type}
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
