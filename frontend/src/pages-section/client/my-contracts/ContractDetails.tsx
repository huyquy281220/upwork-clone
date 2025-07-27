"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ArrowLeft,
  Star,
  MapPin,
  Shield,
  Calendar,
  DollarSign,
} from "lucide-react";
import { ContractOverview } from "./ContractOverview";
import { ContractMilestones } from "./ContractMilestone";
import { ContractPayments } from "./ContractPayment";
import { ContractFiles } from "./ContractFile";
import { ContractProps, ContractType } from "@/types/contract";

interface ContractDetailsProps {
  contract: ContractProps;
  onBack: () => void;
}

export function ContractDetails({ contract, onBack }: ContractDetailsProps) {
  const [activeTab, setActiveTab] = useState("overview");

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "paused":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const hasMilestones =
    contract.contractType === ContractType.FIXED_PRICE &&
    contract.milestones?.length > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4 mb-6">
            <Button variant="ghost" onClick={onBack} className="p-2">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">
                  {contract.title}
                </h1>
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(contract.status)}>
                    {contract.status}
                  </Badge>
                  <Badge variant="outline">{contract.contractType}</Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Freelancer Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="w-12 h-12">
                <AvatarImage
                  src={contract.freelancer.user.avatarUrl || "/placeholder.svg"}
                  alt={contract.freelancer.user.fullName}
                />
                <AvatarFallback>
                  {contract.freelancer.user.fullName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {contract.freelancer.user.fullName}
                  </h2>
                  {contract.freelancer.user.verified && (
                    <Shield className="w-5 h-5 text-blue-600" />
                  )}
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    {/* <span>{contract.freelancer.user.rating}</span> */}
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{contract.freelancer.user.address}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4 text-sm">
              <div className="text-center">
                <div className="flex items-center space-x-1 text-gray-600 mb-1">
                  <Calendar className="w-4 h-4" />
                  <span>Started</span>
                </div>
                <p className="font-medium text-gray-900">
                  {formatDate(contract.startedAt)}
                </p>
              </div>
              <div className="text-center">
                <div className="flex items-center space-x-1 text-gray-600 mb-1">
                  <DollarSign className="w-4 h-4" />
                  <span>Budget</span>
                </div>
                {/* <p className="font-medium text-gray-900">{contract.budget}</p> */}
              </div>
              <div className="text-center">
                <div className="flex items-center space-x-1 text-gray-600 mb-1">
                  <DollarSign className="w-4 h-4" />
                  <span>Paid</span>
                </div>
                <p className="font-medium text-gray-900">
                  {/* {contract.totalPaid} */}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList
            className={`grid w-full ${
              hasMilestones ? "grid-cols-4" : "grid-cols-3"
            }`}
          >
            <TabsTrigger value="overview">Overview</TabsTrigger>
            {hasMilestones && (
              <TabsTrigger value="milestones">Milestones</TabsTrigger>
            )}
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="files">Files</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <ContractOverview contract={contract} />
          </TabsContent>

          {hasMilestones && (
            <TabsContent value="milestones" className="mt-6">
              <ContractMilestones contract={contract} />
            </TabsContent>
          )}

          <TabsContent value="payments" className="mt-6">
            <ContractPayments contract={contract} />
          </TabsContent>

          <TabsContent value="files" className="mt-6">
            <ContractFiles contract={contract} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
