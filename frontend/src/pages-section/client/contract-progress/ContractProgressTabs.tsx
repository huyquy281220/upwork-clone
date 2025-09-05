"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProgressOverview } from "./ContractProgressOverview";
import { WorkSubmissionsTab } from "./WorkSubmissionTab";
import { PaymentTracking } from "./PaymentTracking";
import { ClientByContractProps } from "@/types/contract";

type TabsProps = { contract: ClientByContractProps["contract"] } & Omit<
  ClientByContractProps,
  "contract"
>;

const tabs = [
  { value: "overview", label: "Progress Overview" },
  { value: "submissions", label: "Work Submissions" },
  { value: "payments", label: "Payments" },
];

export function ContractProgressTabs({ contract, ...clientData }: TabsProps) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 h-auto md:h-10 gap-1 md:gap-0 p-1">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="flex items-center justify-start md:justify-center gap-2 w-full h-12 md:h-8 px-4 md:px-3"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <ProgressOverview
            contract={contract}
            progress={clientData.progress}
            totalPaid={clientData.totalPaid}
            hoursWorked={clientData.hoursWorked}
          />
        </TabsContent>

        <TabsContent value="submissions" className="mt-6">
          <WorkSubmissionsTab
            submissions={contract.workSubmission ?? []}
            milestones={contract.milestones ?? []}
          />
        </TabsContent>

        <TabsContent value="payments" className="mt-6">
          <PaymentTracking
            contract={contract}
            totalPaid={clientData.totalPaid}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
