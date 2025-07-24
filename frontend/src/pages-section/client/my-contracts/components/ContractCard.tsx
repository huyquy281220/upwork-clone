"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Calendar,
  DollarSign,
  MapPin,
  Star,
  MessageCircle,
  Clock,
  Shield,
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

interface ContractCardProps {
  contract: Contract;
  onClick: () => void;
}

export function ContractCard({ contract, onClick }: ContractCardProps) {
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
      month: "short",
      day: "numeric",
    });
  };

  const completedMilestones = contract.milestones.filter(
    (m) => m.status === "Completed"
  ).length;
  const totalMilestones = contract.milestones.length;

  return (
    <div
      className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                {contract.title}
              </h3>
              <Badge className={getStatusColor(contract.status)}>
                {contract.status}
              </Badge>
              <Badge variant="outline">{contract.budgetType}</Badge>
            </div>
            <p className="text-gray-600 text-sm line-clamp-2">
              {contract.description}
            </p>
          </div>
        </div>

        {/* Freelancer Info */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Avatar className="w-10 h-10">
              <AvatarImage
                src={contract.freelancer.avatar || "/placeholder.svg"}
                alt={contract.freelancer.name}
              />
              <AvatarFallback>
                {contract.freelancer.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center space-x-2">
                <p className="font-medium text-gray-900">
                  {contract.freelancer.name}
                </p>
                {contract.freelancer.verified && (
                  <Shield className="w-4 h-4 text-blue-600" />
                )}
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <span>{contract.freelancer.rating}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="w-3 h-3" />
                  <span>{contract.freelancer.location}</span>
                </div>
              </div>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Message
          </Button>
        </div>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm text-gray-600">{contract.progress}%</span>
          </div>
          <Progress value={contract.progress} className="h-2" />
        </div>

        {/* Contract Details */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <div className="flex items-center space-x-1 text-gray-600 mb-1">
              <Calendar className="w-4 h-4" />
              <span>Started</span>
            </div>
            <p className="font-medium text-gray-900">
              {formatDate(contract.startDate)}
            </p>
          </div>

          <div>
            <div className="flex items-center space-x-1 text-gray-600 mb-1">
              <DollarSign className="w-4 h-4" />
              <span>Budget</span>
            </div>
            <p className="font-medium text-gray-900">{contract.budget}</p>
          </div>

          <div>
            <div className="flex items-center space-x-1 text-gray-600 mb-1">
              <DollarSign className="w-4 h-4" />
              <span>Paid</span>
            </div>
            <p className="font-medium text-green-600">{contract.totalPaid}</p>
          </div>

          <div>
            <div className="flex items-center space-x-1 text-gray-600 mb-1">
              <Clock className="w-4 h-4" />
              <span>
                {contract.budgetType === "Fixed Price" && totalMilestones > 0
                  ? "Milestones"
                  : "Type"}
              </span>
            </div>
            <p className="font-medium text-gray-900">
              {contract.budgetType === "Fixed Price" && totalMilestones > 0
                ? `${completedMilestones}/${totalMilestones}`
                : contract.budgetType}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
