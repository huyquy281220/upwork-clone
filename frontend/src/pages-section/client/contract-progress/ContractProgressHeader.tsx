"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ArrowLeft,
  Star,
  MapPin,
  Shield,
  Calendar,
  DollarSign,
  MessageCircle,
  Phone,
} from "lucide-react";
import { useRouter } from "next/navigation";

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
}

interface ContractProgressHeaderProps {
  contract: Contract;
}

export function ContractProgressHeader({
  contract,
}: ContractProgressHeaderProps) {
  const router = useRouter();

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

  return (
    <div className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center space-x-4 mb-6">
          <Button variant="ghost" onClick={() => router.back()} className="p-2">
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
                <Badge variant="outline">{contract.budgetType}</Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Freelancer Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="w-16 h-16">
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
                <h2 className="text-xl font-semibold text-gray-900">
                  {contract.freelancer.name}
                </h2>
                {contract.freelancer.verified && (
                  <Shield className="w-5 h-5 text-blue-600" />
                )}
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span>{contract.freelancer.rating}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{contract.freelancer.location}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <MessageCircle className="w-4 h-4 mr-2" />
                Message
              </Button>
              <Button variant="outline" size="sm">
                <Phone className="w-4 h-4 mr-2" />
                Call
              </Button>
            </div>

            <div className="flex items-center space-x-6 text-sm">
              <div className="text-center">
                <div className="flex items-center space-x-1 text-gray-600 mb-1">
                  <Calendar className="w-4 h-4" />
                  <span>Started</span>
                </div>
                <p className="font-medium text-gray-900">
                  {formatDate(contract.startDate)}
                </p>
              </div>
              <div className="text-center">
                <div className="flex items-center space-x-1 text-gray-600 mb-1">
                  <DollarSign className="w-4 h-4" />
                  <span>Budget</span>
                </div>
                <p className="font-medium text-gray-900">{contract.budget}</p>
              </div>
              <div className="text-center">
                <div className="flex items-center space-x-1 text-gray-600 mb-1">
                  <DollarSign className="w-4 h-4" />
                  <span>Paid</span>
                </div>
                <p className="font-medium text-gray-900">
                  {contract.totalPaid}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
