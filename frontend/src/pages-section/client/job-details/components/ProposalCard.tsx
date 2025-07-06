"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
// import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HoursPerWeek } from "@/types/jobs";
import { ProposalProps } from "@/types/proposals";
import {
  Eye,
  MapPin,
  MessageSquare,
  Star,
  ThumbsDown,
  ThumbsUp,
  Verified,
} from "lucide-react";

interface ProposalCardProps {
  proposal: ProposalProps;
  onViewDetails: (proposal: ProposalProps) => void;
}

export function ProposalCard({ proposal, onViewDetails }: ProposalCardProps) {
  // const formatRate = (proposal: ProposalProps) => {
  //   if (proposal.proposalType === "hourly") {
  //     return `$${proposal.rate}/hr`;
  //   } else {
  //     return `$${proposal.rate.toLocaleString()}`;
  //   }
  // };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-4">
            <Avatar className="w-16 h-16">
              <AvatarImage
                src={proposal.freelancer.user.avatarUrl || "/placeholder.svg"}
              />
              <AvatarFallback>
                {proposal.freelancer.user.fullName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="text-lg font-semibold text-foreground">
                  {proposal.freelancer.user.fullName}
                </h3>
                {proposal.freelancer.user.verified && (
                  <Verified className="w-4 h-4 text-blue-500" />
                )}
                {/* {proposal.freelancer.topRated && (
                  <Badge className="bg-orange-100 text-orange-800 border-orange-200 text-xs">
                    <Award className="w-3 h-3 mr-1" />
                    Top Rated
                  </Badge>
                )} */}
              </div>
              <p className="text-sm text-gray-400 mb-2">
                {proposal.freelancer.title}
              </p>
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-3 h-3" />
                  <span>{proposal.freelancer.user.address}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  {/* <span>{proposal.freelancer.rating}</span>
                  <span>({proposal.freelancer.reviewsCount} reviews)</span> */}
                </div>
                {/* <span>{proposal.freelancer.totalEarned} earned</span> */}
              </div>
              <div className="flex items-center space-x-4 text-xs text-gray-400">
                {/* <span>{proposal.freelancer.successRate}% success rate</span>
                <span>Responds in {proposal.freelancer.responseTime}</span> */}
                <span>
                  {
                    HoursPerWeek[
                      proposal.freelancer.available as keyof typeof HoursPerWeek
                    ]
                  }{" "}
                  available
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-1 mb-4">
          {proposal.freelancer.skills.slice(0, 6).map(({ id, name }) => (
            <Badge
              key={id}
              variant="secondary"
              className="bg-background text-foreground flex items-center gap-1 py-1.5 border border-gray-700"
            >
              {name}
            </Badge>
          ))}
          {proposal.freelancer.skills.length > 6 && (
            <Badge
              variant="secondary"
              className="bg-background text-foreground flex items-center gap-1 py-1.5 border border-gray-700"
            >
              +{proposal.freelancer.skills.length - 6} more
            </Badge>
          )}
        </div>

        {/* Cover Letter Preview */}
        <div className="bg-subBackground rounded-lg p-4 mb-4">
          <h4 className="font-medium text-sm mb-2">Cover Letter</h4>
          <p className="text-sm text-gray-400 line-clamp-4">
            {proposal.coverLetter}
          </p>
        </div>

        {/* Project Details */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="bg-subBackground border rounded-lg p-3">
            <p className="text-xs text-gray-500 mb-1">Timeline</p>
            <p className="font-medium text-sm">{proposal.timeline}</p>
          </div>
          <div className="bg-subBackground border rounded-lg p-3">
            <p className="text-xs text-gray-500 mb-1">Level</p>
            <p className="font-medium text-sm">
              {proposal.job.experienceLevel}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              className="bg-green-600 hover:bg-green-700"
              onClick={() => onViewDetails(proposal)}
            >
              <Eye className="w-4 h-4 mr-1" />
              View Details
            </Button>
            <Button
              variant="outline"
              size="sm"
              // onClick={() => onMessage(proposal)}
            >
              <MessageSquare className="w-4 h-4 mr-1" />
              Message
            </Button>
            {/* <Button variant="ghost" size="sm">
              <Heart className="w-4 h-4 mr-1" />
              {proposal.shortlisted ? "Shortlisted" : "Shortlist"}
            </Button> */}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="text-green-600 hover:text-green-700 border-green-200 hover:bg-green-50 bg-transparent"
            >
              <ThumbsUp className="w-4 h-4 mr-1" />
              Accept
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-red-600 hover:text-red-700 border-red-200 hover:bg-red-50 bg-transparent"
            >
              <ThumbsDown className="w-4 h-4 mr-1" />
              Reject
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
