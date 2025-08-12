"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle,
  MessageSquare,
  FileText,
  Calendar,
  DollarSign,
  X,
} from "lucide-react";

interface ContractSuccessProps {
  action: "accepted" | "declined" | "changes-requested";
  clientName: string;
  contractTitle: string;
  nextSteps?: string[];
}

export function ContractSuccess({
  action,
  clientName,
  contractTitle,
  nextSteps,
}: ContractSuccessProps) {
  const getActionDetails = () => {
    switch (action) {
      case "accepted":
        return {
          icon: <CheckCircle className="w-16 h-16 text-green-500" />,
          title: "Contract Accepted!",
          message: `You've successfully accepted the contract from ${clientName}. Work can begin as outlined in the terms.`,
          color: "green",
        };
      case "declined":
        return {
          icon: <X className="w-16 h-16 text-red-500" />,
          title: "Contract Declined",
          message: `You've declined the contract from ${clientName}. They have been notified of your decision.`,
          color: "red",
        };
      case "changes-requested":
        return {
          icon: <MessageSquare className="w-16 h-16 text-blue-500" />,
          title: "Changes Requested",
          message: `Your change request has been sent to ${clientName}. They'll review and respond to your suggestions.`,
          color: "blue",
        };
      default:
        return {
          icon: <CheckCircle className="w-16 h-16 text-green-500" />,
          title: "Action Completed",
          message: "Your response has been recorded.",
          color: "green",
        };
    }
  };

  const actionDetails = getActionDetails();

  const defaultNextSteps = {
    accepted: [
      "Start working according to the contract terms",
      "Track your time or progress on milestones",
      "Communicate regularly with your client",
      "Submit work for review when ready",
    ],
    declined: [
      "Look for other opportunities that match your preferences",
      "Consider what terms would work better for future contracts",
      "Keep your profile updated to attract better offers",
    ],
    "changes-requested": [
      "Wait for the client's response to your suggestions",
      "Be prepared to negotiate further if needed",
      "Check your messages for updates from the client",
      "Consider alternative terms if your first request is declined",
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Card className="max-w-lg w-full mx-4">
        <CardContent className="p-8 text-center">
          {actionDetails.icon}
          <h2 className="text-2xl font-bold mb-2 mt-4">
            {actionDetails.title}
          </h2>
          <p className="text-gray-600 mb-6">{actionDetails.message}</p>

          {/* Next Steps */}
          <div className="text-left mb-6">
            <h3 className="font-semibold mb-3">What happens next?</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              {(nextSteps || defaultNextSteps[action]).map((step, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-gray-400 mt-1">•</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {action === "accepted" && (
              <>
                <Button
                  className="w-full bg-green-600 hover:bg-green-700"
                  asChild
                >
                  <a href="/contracts">
                    <FileText className="w-4 h-4 mr-2" />
                    View My Contracts
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  asChild
                >
                  <a href="/best-matches">
                    <Calendar className="w-4 h-4 mr-2" />
                    Find More Work
                  </a>
                </Button>
              </>
            )}

            {action === "declined" && (
              <>
                <Button className="w-full" asChild>
                  <a href="/best-matches">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Find New Opportunities
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  asChild
                >
                  <a href="/contracts">
                    <FileText className="w-4 h-4 mr-2" />
                    View All Contracts
                  </a>
                </Button>
              </>
            )}

            {action === "changes-requested" && (
              <>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Message {clientName}
                </Button>
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  asChild
                >
                  <a href="/contracts">
                    <FileText className="w-4 h-4 mr-2" />
                    View All Contracts
                  </a>
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
