"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProposalProps } from "@/types/proposals";
import {
  Eye,
  Heart,
  MapPin,
  MessageSquare,
  MoreHorizontal,
  Star,
  ThumbsDown,
  Verified,
  Award,
} from "lucide-react";

interface ProposalCardProps {
  proposal: {
    id: number;
    freelancer: {
      name: string;
      avatar: string;
      title: string;
      location: string;
      rating: number;
      reviewsCount: number;
      totalEarned: string;
      successRate: number;
      responseTime: string;
      languages: string[];
      verified: boolean;
      topRated: boolean;
      skills: string[];
      hourlyRate: number;
      availability: string;
    };
    submittedDate: string;
    proposalType: string;
    rate: number;
    coverLetter: string;
    timeline: string;
    availability: string;
    clientQuestions: string[];
    attachments: Array<{ name: string; size: string; type: string }>;
    portfolio: Array<{
      title: string;
      description: string;
      image: string;
      technologies: string[];
    }>;
    status: string;
    viewed: boolean;
    shortlisted: boolean;
  };
  onViewDetails: (proposal: any) => void;
  onMessage: (proposal: any) => void;
}

export function ProposalCard({
  proposal,
  onViewDetails,
  onMessage,
}: ProposalCardProps) {
  const formatRate = (proposal: ProposalProps) => {
    if (proposal.proposalType === "hourly") {
      return `$${proposal.rate}/hr`;
    } else {
      return `$${proposal.rate.toLocaleString()}`;
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-4">
            <Avatar className="w-16 h-16">
              <AvatarImage
                src={proposal.freelancer.avatar || "/placeholder.svg"}
              />
              <AvatarFallback>
                {proposal.freelancer.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="text-lg font-semibold text-gray-900">
                  {proposal.freelancer.name}
                </h3>
                {proposal.freelancer.verified && (
                  <Verified className="w-4 h-4 text-blue-500" />
                )}
                {proposal.freelancer.topRated && (
                  <Badge className="bg-orange-100 text-orange-800 border-orange-200 text-xs">
                    <Award className="w-3 h-3 mr-1" />
                    Top Rated
                  </Badge>
                )}
              </div>
              <p className="text-sm text-gray-600 mb-2">
                {proposal.freelancer.title}
              </p>
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-3 h-3" />
                  <span>{proposal.freelancer.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span>{proposal.freelancer.rating}</span>
                  <span>({proposal.freelancer.reviewsCount} reviews)</span>
                </div>
                <span>{proposal.freelancer.totalEarned} earned</span>
              </div>
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                <span>{proposal.freelancer.successRate}% success rate</span>
                <span>Responds in {proposal.freelancer.responseTime}</span>
                <span>{proposal.freelancer.availability} available</span>
              </div>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-1 mb-4">
          {proposal.freelancer.skills.slice(0, 6).map((skill, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
          {proposal.freelancer.skills.length > 6 && (
            <Badge variant="outline" className="text-xs">
              +{proposal.freelancer.skills.length - 6} more
            </Badge>
          )}
        </div>

        {/* Cover Letter Preview */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <h4 className="font-medium text-sm mb-2">Cover Letter</h4>
          <p className="text-sm text-gray-700 line-clamp-4">
            {proposal.coverLetter}
          </p>
          <Button
            variant="ghost"
            size="sm"
            className="mt-2 p-0 h-auto text-green-600 hover:text-green-700"
            onClick={() => onViewDetails(proposal)}
          >
            Read full proposal
          </Button>
        </div>

        {/* Project Details */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="bg-white border rounded-lg p-3">
            <p className="text-xs text-gray-500 mb-1">Timeline</p>
            <p className="font-medium text-sm">{proposal.timeline}</p>
          </div>
          <div className="bg-white border rounded-lg p-3">
            <p className="text-xs text-gray-500 mb-1">Availability</p>
            <p className="font-medium text-sm">{proposal.availability}</p>
          </div>
          <div className="bg-white border rounded-lg p-3">
            <p className="text-xs text-gray-500 mb-1">Attachments</p>
            <p className="font-medium text-sm">
              {proposal.attachments.length} files
            </p>
          </div>
          <div className="bg-white border rounded-lg p-3">
            <p className="text-xs text-gray-500 mb-1">Portfolio</p>
            <p className="font-medium text-sm">
              {proposal.portfolio.length} projects
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
              onClick={() => onMessage(proposal)}
            >
              <MessageSquare className="w-4 h-4 mr-1" />
              Message
            </Button>
            <Button variant="ghost" size="sm">
              <Heart className="w-4 h-4 mr-1" />
              {proposal.shortlisted ? "Shortlisted" : "Shortlist"}
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-red-600 hover:text-red-700"
            >
              <ThumbsDown className="w-4 h-4 mr-1" />
              Decline
            </Button>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
