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

export function ContractProgressTabs({ contract, ...clientData }: TabsProps) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Progress Overview</TabsTrigger>
          <TabsTrigger value="activity">Work Activity</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <ProgressOverview
            contract={contract}
            progress={clientData.progress}
            totalPaid={clientData.totalPaid}
            hoursWorked={clientData.hoursWorked}
          />
        </TabsContent>

        <TabsContent value="activity" className="mt-6">
          <WorkSubmissionsTab />
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
