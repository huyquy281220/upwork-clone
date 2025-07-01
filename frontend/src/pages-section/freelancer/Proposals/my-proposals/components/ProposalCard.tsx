"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProposalProps } from "@/types/proposals";
import { formatRelativeTime } from "@/utils/getRelativeTime";
import {
  Calendar,
  DollarSign,
  Heart,
  MapPin,
  MessageSquare,
  Star,
} from "lucide-react";

interface ProposalCardProps {
  proposal: ProposalProps;
}

export function ProposalCard({ proposal }: ProposalCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-green-100 text-green-800 border-green-200";
      case "ACCEPTED":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "REJECTED":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="text-lg font-semibold text-green-600 cursor-pointer">
                {proposal.job.title}
              </h3>
            </div>

            <div className="flex items-center space-x-4 text-sm text-foreground-muted opacity-85 mb-3">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>Submitted {formatRelativeTime(proposal.createdAt)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <DollarSign className="w-4 h-4" />
                {proposal.job.fixedPrice ? (
                  <span>{proposal.job.fixedPrice}$</span>
                ) : (
                  <span>
                    ${proposal.job.hourlyRateMin} - $
                    {proposal.job.hourlyRateMax}
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-1">
                {/* <span>{proposal.connects} Connects</span> */}
              </div>
            </div>

            <div className="flex items-center space-x-3 mb-4">
              <Avatar className="w-8 h-8">
                <AvatarImage
                  src={proposal.freelancer.user.avatar || "/placeholder.svg"}
                />
                <AvatarFallback>
                  {proposal.freelancer.user.fullName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-foreground">
                    {proposal.freelancer.user.fullName}
                  </span>
                  {proposal.freelancer.user.verified && (
                    <Badge
                      variant="outline"
                      className="bg-blue-50 text-blue-700 border-blue-200 text-xs"
                    >
                      Verified
                    </Badge>
                  )}
                </div>
                <div className="flex items-center space-x-3 text-sm text-foreground-muted opacity-85">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3" />
                    <span>
                      {proposal.freelancer.user.address || "World wide"}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    {/* <span>{proposal.client.rating}</span> */}
                  </div>
                  {/* <span>{proposal.client.totalSpent} spent</span> */}
                </div>
              </div>
            </div>

            <div className="bg-gray-100 rounded-lg p-4 mb-4">
              <p className="text-sm text-gray-700 line-clamp-2">
                {proposal.coverLetter}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Badge className={getStatusColor(proposal.status)}>
                  {proposal.status}
                </Badge>
                <span className="text-sm font-medium text-foreground">
                  Your rate: {proposal.pricing}$/hr
                </span>
                {/* {proposal.viewed && (
                  <div className="flex items-center space-x-1 text-sm text-foreground-muted opacity-85">
                    <Eye className="w-4 h-4" />
                    <span>Viewed</span>
                  </div>
                )} */}
              </div>

              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <MessageSquare className="w-4 h-4 mr-1" />
                  Message
                </Button>
                <Button variant="ghost" size="sm">
                  <Heart className="w-4 h-4" />
                </Button>
                {/* <Button variant="ghost" size="sm">
                  <MoreHorizontal className="w-4 h-4" />
                </Button> */}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
