"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProgressOverview } from "./ContractProgressOverview";
import { WorkActivity } from "./WorkActivity";
import { PaymentTracking } from "./PaymentTracking";

interface Contract {
  id: number;
  title: string;
  freelancer: {
    name: string;
    avatar: string;
    rating: number;
    location: string;
    verified: boolean;
  };
  status: string;
  startDate: string;
  budget: string;
  budgetType: string;
  hourlyRate: string | null;
  totalPaid: string;
  progress: number;
  category: string;
  description: string;
  milestones?: Array<{
    id: number;
    title: string;
    amount: string;
    status: string;
    dueDate: string;
  }>;
}

interface ContractProgressTabsProps {
  contract: Contract;
}

export function ContractProgressTabs({ contract }: ContractProgressTabsProps) {
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
          <ProgressOverview contract={contract} />
        </TabsContent>

        <TabsContent value="activity" className="mt-6">
          <WorkActivity contractId={contract.id} />
        </TabsContent>

        <TabsContent value="payments" className="mt-6">
          <PaymentTracking contract={contract} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
