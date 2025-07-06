"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { JobType } from "@/types/jobs";
import { ProposalProps } from "@/types/proposals";
import { Download, FileText, Star, ThumbsDown, ThumbsUp } from "lucide-react";

interface FreelancerDetailsModalProps {
  proposal: ProposalProps;
  isOpen: boolean;
  onClose: () => void;
}

export function FreelancerDetailsModal({
  proposal,
  isOpen,
  onClose,
}: FreelancerDetailsModalProps) {
  if (!proposal) return null;

  const formatRate = (proposal: ProposalProps) => {
    if (proposal.job.jobType === JobType.HOURLY) {
      return `$${proposal.job.hourlyRateMin} - ${proposal.job.hourlyRateMax}/hr`;
    } else {
      return `$${proposal.job.fixedPrice}`;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            <Avatar className="w-12 h-12">
              <AvatarImage
                src={proposal.freelancer.user.avatarUrl || "/placeholder.svg"}
              />
              <AvatarFallback>
                {proposal.freelancer.user.fullName
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <span className="text-lg">
                {proposal.freelancer.user.fullName}
              </span>
              <p className="text-sm text-gray-600 font-normal">
                {proposal.freelancer.title}
              </p>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 overflow-hidden">
          {/* Freelancer Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-subBackground rounded-lg">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-bold">0</span>
              </div>
              <p className="text-xs text-gray-400">
                {/* {proposal.freelancer.reviewsCount} reviews */}0 reviews
              </p>
            </div>
            <div className="text-center p-3 bg-subBackground rounded-lg">
              <div className="font-bold text-green-600 mb-1">
                {/* {proposal.freelancer.successRate}% */}
                0%
              </div>
              <p className="text-xs text-gray-400">Success rate</p>
            </div>
            <div className="text-center p-3 bg-subBackground rounded-lg">
              <div className="font-bold mb-1">
                {/* {proposal.freelancer.totalEarned} */}0
              </div>
              <p className="text-xs text-gray-400">Total earned</p>
            </div>
          </div>

          {/* Proposal Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Proposal Rate</h3>
              <p className="text-2xl font-bold text-green-600">
                {formatRate(proposal)}
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Timeline</h3>
              <p className="text-lg">{proposal.timeline}</p>
            </div>
          </div>

          {/* Cover Letter */}
          <div>
            <h3 className="font-semibold mb-3">Cover Letter</h3>
            <div className="bg-subBackground rounded-lg p-4">
              <p className="text-sm text-gray-700 whitespace-pre-line">
                {proposal.coverLetter}
              </p>
            </div>
          </div>

          {/* Attachments */}
          {proposal.attachment && (
            <div>
              <h3 className="font-semibold mb-3">Attachments</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-subBackground rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-gray-500" />
                    <div>
                      <a
                        href={proposal.attachment}
                        className="font-medium text-sm"
                        target="_blank"
                      >
                        {proposal.attachment}
                      </a>
                      {/* <p className="text-xs text-gray-500">{file.size}</p> */}
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="flex justify-between">
          <div className="flex space-x-2">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              className="text-red-600 hover:text-red-700 bg-transparent"
            >
              <ThumbsDown className="w-4 h-4 mr-2" />
              Decline
            </Button>
            <Button className="bg-green-600 hover:bg-green-700">
              <ThumbsUp className="w-4 h-4 mr-2" />
              Hire
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
