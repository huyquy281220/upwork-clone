"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Upload, BarChart3 } from "lucide-react";
import { ContractType, MilestoneProps } from "@/types/contract";
import { WorkLogStats } from "../WorkLogStats";
import { WorkOverview } from "../WorkLogOverview";
import { TimeEntriesList } from "../TimeEntriesList";
import { WorkSubmissions } from "../WorkLogSubmission";
import { WorkSubmissionProps } from "@/types/work-submissions";
import { WorkLogProps, CreateWorkLogProps } from "@/types/work-log";
import { CreateWorkSubmissionProps } from "@/types/work-submissions";

type WorkLogTabsProps = {
  contractType: ContractType;
  hourlyRate: number;
  stats: {
    totalEarning: number;
    weekEarning: number;
    progress: number;
    completedMilestones: number;
    totalMilestones: number;
    totalHoursWorked: number;
  };
  timeEntries: WorkLogProps[];
  submissions: WorkSubmissionProps[];
  milestones?: MilestoneProps[];
  onAddTimeEntry: (entry: CreateWorkLogProps) => void;
  onEditTimeEntry: (id: string, entry: Partial<WorkLogProps>) => void;
  onDeleteTimeEntry: (id: string) => void;
  onAddSubmission: (submission: CreateWorkSubmissionProps) => void;
  onUpdateSubmission: (
    id: string,
    submission: Partial<WorkSubmissionProps>
  ) => void;
  canCreateSubmission: boolean;
};

export function WorkLogTabs({
  contractType,
  hourlyRate,
  stats,
  timeEntries,
  submissions,
  milestones,
  onAddTimeEntry,
  onEditTimeEntry,
  onDeleteTimeEntry,
  onAddSubmission,
  onUpdateSubmission,
  canCreateSubmission,
}: WorkLogTabsProps) {
  const tabsConfig = [
    { value: "overview", label: "Overview", icon: BarChart3 },
    ...(contractType === ContractType.HOURLY
      ? [{ value: "time-entries", label: "Time Entries", icon: Clock }]
      : []),
    { value: "submissions", label: "Work Submissions", icon: Upload },
  ];

  return (
    <div className="space-y-6">
      <WorkLogStats contractType={contractType} stats={stats} />

      <Tabs defaultValue="overview" className="w-full">
        <TabsList
          className={`grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 h-28`}
        >
          {tabsConfig.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="flex items-center gap-2"
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <WorkOverview
            contractType={contractType}
            stats={stats}
            timeEntries={timeEntries}
            submissions={submissions}
            milestones={milestones}
          />
        </TabsContent>

        {contractType === ContractType.HOURLY && (
          <TabsContent value="time-entries" className="mt-6">
            <TimeEntriesList
              timeEntries={timeEntries}
              hourlyRate={hourlyRate}
              onAddTimeEntry={onAddTimeEntry}
              onEditTimeEntry={onEditTimeEntry}
              onDeleteTimeEntry={onDeleteTimeEntry}
            />
          </TabsContent>
        )}

        <TabsContent value="submissions" className="mt-6">
          <WorkSubmissions
            entries={timeEntries}
            canCreate={canCreateSubmission}
            submissions={submissions}
            milestones={milestones}
            contractType={contractType}
            onAddSubmission={onAddSubmission}
            onUpdateSubmission={onUpdateSubmission}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
