"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MapPin,
  Star,
  Verified,
  Building,
  Calendar,
  DollarSign,
} from "lucide-react";
import { ClientDataProps } from "./ContractDetails";
import { formatDateFromISO } from "@/utils/formatDate";

const contractDetails = {
  sentDate: "February 20, 2024",
  expiresDate: "February 27, 2024",
  responseTime: "7 days",
};

export function ClientInfo({
  client,
  activeHires,
  hireRate,
  jobPosted,
  rating,
  reviewCount,
  totalSpent,
}: ClientDataProps) {
  const clientUser = client.user;

  return (
    <div className="space-y-6">
      {/* Client Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">About the Client</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start space-x-4 mb-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={clientUser?.avatarUrl || "/placeholder.svg"} />
              <AvatarFallback>
                {(clientUser?.fullName ?? "")
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="text-lg font-semibold text-foreground">
                  {clientUser.fullName}
                </h3>
                {clientUser.verified && (
                  <Verified className="w-4 h-4 text-blue-500" />
                )}
              </div>
              <div className="flex items-center space-x-2 text-sm !text-muted-foreground mb-2">
                <Building className="w-3 h-3" />
                <span>{client.companyName}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="w-3 h-3" />
                <span>{clientUser.address}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center p-3 bg-subBackground rounded-lg">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-bold">{rating}</span>
              </div>
              <p className="text-xs text-foreground opacity-80">
                {reviewCount} reviews
              </p>
            </div>
            <div className="text-center p-3 bg-subBackground rounded-lg">
              <div className="font-bold text-green-600 mb-1">{hireRate}%</div>
              <p className="text-xs text-foreground opacity-80">Hire rate</p>
            </div>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-foreground">Total spent:</span>
              <span className="font-medium">{totalSpent}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-foreground">Jobs posted:</span>
              <span className="font-medium">{jobPosted}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-foreground">Active hires:</span>
              <span className="font-medium">{activeHires}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-foreground">Member since:</span>
              <span className="font-medium">
                {formatDateFromISO(clientUser.createdAt)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contract Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Contract Timeline</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Calendar className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-sm">Contract Sent</p>
              <p className="text-xs text-foreground opacity-80">
                {contractDetails.sentDate}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-yellow-600" />
            </div>
            <div>
              <p className="font-medium text-sm">Response Required</p>
              <p className="text-xs text-foreground opacity-80">
                By {contractDetails.expiresDate}
              </p>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-3">
            <h4 className="font-medium text-blue-900 mb-1">Need Help?</h4>
            <p className="text-xs text-blue-800 mb-2">
              Review the contract terms carefully. You can accept, decline, or
              request changes.
            </p>
            <a
              href="#"
              className="text-xs text-blue-600 hover:text-blue-700 underline"
            >
              Learn about contracts →
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
