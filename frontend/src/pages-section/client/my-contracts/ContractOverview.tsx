"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  DollarSign,
  Clock,
  Target,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Pause,
  X,
  Timer,
} from "lucide-react";
import {
  ContractProps,
  ContractType,
  MilestoneStatus,
  ContractStatus,
} from "@/types/contract";

interface ContractOverviewProps {
  contract: ContractProps;
}

export function ContractOverview({ contract }: ContractOverviewProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const isHourlyContract = contract.contractType === ContractType.HOURLY;
  const hasMilestones =
    contract.contractType === ContractType.FIXED_PRICE &&
    contract.milestones?.length > 0;

  const completedMilestones = contract.milestones?.filter(
    (m) => m.status === MilestoneStatus.COMPLETED
  ).length;
  const totalMilestones = contract.milestones?.length;
  const nextMilestone = contract.milestones?.find(
    (m) =>
      m.status === MilestoneStatus.IN_PROGRESS ||
      m.status === MilestoneStatus.PENDING
  );

  // Mock data for hourly contracts
  const hoursWorked = isHourlyContract ? 30 : 0;
  const estimatedHours = isHourlyContract ? 40 : 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-6">
        {/* Project Description */}
        <Card>
          <CardHeader>
            <CardTitle>Project Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">
              {contract.description}
            </p>
            <div className="mt-4">
              {/* <Badge variant="outline">{contract.category}</Badge> */}
            </div>
          </CardContent>
        </Card>

        {/* Progress Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Progress Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Overall Progress
                  </span>
                  <span className="text-sm text-gray-600">
                    {/* {contract.progress}% */}
                  </span>
                </div>
                {/* <Progress value={contract.progress} className="h-3" /> */}
              </div>

              {isHourlyContract ? (
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Timer className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-blue-600">
                      {hoursWorked}h
                    </p>
                    <p className="text-sm text-gray-600">Hours Worked</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <Clock className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-purple-600">
                      {estimatedHours}h
                    </p>
                    <p className="text-sm text-gray-600">Estimated Hours</p>
                  </div>
                </div>
              ) : hasMilestones ? (
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-green-600">
                      {completedMilestones}
                    </p>
                    <p className="text-sm text-gray-600">
                      Completed Milestones
                    </p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-blue-600">
                      {/* {totalMilestones - completedMilestones} */}
                    </p>
                    <p className="text-sm text-gray-600">
                      Remaining Milestones
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <CheckCircle className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-lg font-medium text-blue-900">
                    Fixed Price Project
                  </p>
                  <p className="text-sm text-gray-600">No milestones defined</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Next Milestone - Only show for fixed price with milestones */}
        {hasMilestones && nextMilestone && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertCircle className="w-5 h-5 mr-2 text-orange-500" />
                Next Milestone
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">
                    {/* {nextMilestone.title} */}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Due: {formatDate(nextMilestone.dueDate)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">
                    {nextMilestone.amount}
                  </p>
                  <Badge
                    variant={
                      nextMilestone.status === MilestoneStatus.IN_PROGRESS
                        ? "default"
                        : "secondary"
                    }
                    className="text-xs"
                  >
                    {nextMilestone.status}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Contract Details */}
        <Card>
          <CardHeader>
            <CardTitle>Contract Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">Start Date</span>
              </div>
              <span className="text-sm font-medium">
                {formatDate(contract.startedAt)}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">Budget</span>
              </div>
              {/* <span className="text-sm font-medium">{contract.budget}</span> */}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">Type</span>
              </div>
              <span className="text-sm font-medium">
                {contract.contractType}
              </span>
            </div>

            {contract.hourlyRate && (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Hourly Rate</span>
                </div>
                <span className="text-sm font-medium">
                  {contract.hourlyRate}
                </span>
              </div>
            )}

            {isHourlyContract && (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Timer className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Hours Worked</span>
                </div>
                <span className="text-sm font-medium">{hoursWorked}h</span>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">Total Paid</span>
              </div>
              <span className="text-sm font-medium text-green-600">
                {/* {contract.totalPaid} */}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full bg-transparent" variant="outline">
              Message Freelancer
            </Button>
            <Button className="w-full bg-transparent" variant="outline">
              Request Update
            </Button>
            {contract.status === ContractStatus.ACTIVE && (
              <Button className="w-full bg-transparent" variant="outline">
                <Pause className="w-4 h-4 mr-2" />
                Pause Contract
              </Button>
            )}
            <Button
              className="w-full text-red-600 hover:text-red-700 bg-transparent"
              variant="outline"
            >
              <X className="w-4 h-4 mr-2" />
              End Contract
            </Button>
          </CardContent>
        </Card>

        {/* Payment Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">
                  {isHourlyContract ? "Hourly Rate" : "Total Budget"}
                </span>
                {/* <span className="text-sm font-medium">{contract.budget}</span> */}
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Amount Paid</span>
                <span className="text-sm font-medium text-green-600">
                  {/* {contract.totalPaid} */}
                </span>
              </div>
              {!isHourlyContract && (
                <div className="flex justify-between pt-2 border-t">
                  <span className="text-sm font-medium text-gray-900">
                    Remaining
                  </span>
                  {/* <span className="text-sm font-medium text-gray-900">
                    $
                    {(
                      Number.parseFloat(contract.budget.replace(/[$,]/g, "")) -
                      Number.parseFloat(contract.totalPaid.replace(/[$,]/g, ""))
                    ).toLocaleString()}
                  </span> */}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
