"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle,
  Clock,
  AlertCircle,
  Calendar,
  DollarSign,
  Plus,
  Edit,
  X,
} from "lucide-react";

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
  milestones: Array<{
    id: number;
    title: string;
    amount: string;
    status: string;
    dueDate: string;
  }>;
}

interface ContractMilestonesProps {
  contract: Contract;
}

export function ContractMilestones({ contract }: ContractMilestonesProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "in progress":
        return <Clock className="w-5 h-5 text-blue-600" />;
      case "pending":
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in progress":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const completedMilestones = contract.milestones.filter(
    (m) => m.status === "Completed"
  ).length;
  const totalMilestones = contract.milestones.length;
  const progressPercentage =
    totalMilestones > 0 ? (completedMilestones / totalMilestones) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Milestones Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Milestones Overview</CardTitle>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Milestone
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-600">
                {completedMilestones}
              </p>
              <p className="text-sm text-gray-600">Completed</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-blue-600">
                {
                  contract.milestones.filter((m) => m.status === "In Progress")
                    .length
                }
              </p>
              <p className="text-sm text-gray-600">In Progress</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <AlertCircle className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-yellow-600">
                {
                  contract.milestones.filter((m) => m.status === "Pending")
                    .length
                }
              </p>
              <p className="text-sm text-gray-600">Pending</p>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Overall Progress
              </span>
              <span className="text-sm text-gray-600">
                {Math.round(progressPercentage)}%
              </span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Milestones List */}
      <div className="space-y-4">
        {contract.milestones.map((milestone, index) => (
          <Card key={milestone.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="flex-shrink-0 mt-1">
                    {getStatusIcon(milestone.status)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {milestone.title}
                      </h3>
                      <Badge className={getStatusColor(milestone.status)}>
                        {milestone.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <div>
                        <div className="flex items-center space-x-1 text-sm text-gray-600 mb-1">
                          <DollarSign className="w-4 h-4" />
                          <span>Amount</span>
                        </div>
                        <p className="text-sm font-medium text-gray-900">
                          {milestone.amount}
                        </p>
                      </div>

                      <div>
                        <div className="flex items-center space-x-1 text-sm text-gray-600 mb-1">
                          <Calendar className="w-4 h-4" />
                          <span>Due Date</span>
                        </div>
                        <p className="text-sm font-medium text-gray-900">
                          {formatDate(milestone.dueDate)}
                        </p>
                      </div>

                      <div>
                        <div className="flex items-center space-x-1 text-sm text-gray-600 mb-1">
                          <span>Milestone</span>
                        </div>
                        <p className="text-sm font-medium text-gray-900">
                          #{index + 1} of {totalMilestones}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  {milestone.status === "Pending" && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700 bg-transparent"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>

              {milestone.status === "In Progress" && (
                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Progress</span>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        Request Update
                      </Button>
                      <Button size="sm">Approve & Release Payment</Button>
                    </div>
                  </div>
                </div>
              )}

              {milestone.status === "Completed" && (
                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      <span>Payment released</span>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
