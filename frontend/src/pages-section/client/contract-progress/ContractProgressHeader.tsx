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
} from "lucide-react";
import { useRouter } from "next/navigation";
import { getContractStatusColor } from "@/utils/getStatusColor";
import { formatDateToMonthDayYear } from "@/utils/formatDate";
import { ContractProps, ContractType } from "@/types/contract";

interface ContractProgressHeaderProps {
  contract: ContractProps;
  rating: number;
  totalPaid: number;
}

export function ContractProgressHeader({
  contract,
  rating,
  totalPaid,
}: ContractProgressHeaderProps) {
  const router = useRouter();

  return (
    <div className="bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 border-b">
        <div className="flex items-center space-x-4 mb-6">
          <Button variant="ghost" onClick={() => router.back()} className="p-2">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-foreground">
                {contract.title}
              </h1>
              <div className="flex items-center space-x-2">
                <Badge className={getContractStatusColor(contract.status)}>
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
            <Avatar className="w-16 h-16">
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
                <h2 className="text-xl font-semibold text-foreground">
                  {contract.freelancer.user.fullName}
                </h2>
                {contract.freelancer.user.verified && (
                  <Shield className="w-5 h-5 text-green-600" />
                )}
              </div>
              <div className="flex items-center space-x-4 text-sm text-foreground opacity-80 mt-1">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span>{rating}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{contract.freelancer.user.address}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <MessageCircle className="w-4 h-4 mr-2" />
              Message
            </Button>

            <div className="flex items-center space-x-6 text-sm">
              <div className="text-center">
                <div className="flex items-center space-x-1 text-foreground mb-1">
                  <Calendar className="w-4 h-4" />
                  <span>Started</span>
                </div>
                <p className="font-medium text-foreground opacity-80">
                  {formatDateToMonthDayYear(contract.startedAt)}
                </p>
              </div>
              {contract.contractType === ContractType.FIXED_PRICE && (
                <div className="text-center">
                  <div className="flex items-center space-x-1 text-foreground mb-1">
                    <DollarSign className="w-4 h-4" />
                    <span>Budget</span>
                  </div>
                  <p className="font-medium text-foreground opacity-80">
                    {contract.totalPrice}
                  </p>
                </div>
              )}
              <div className="text-center">
                <div className="flex items-center space-x-1 text-foreground mb-1">
                  <DollarSign className="w-4 h-4" />
                  <span>Paid</span>
                </div>
                <p className="font-medium text-foreground opacity-80">
                  {totalPaid}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
