"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ContractSummaryProps {
  contractType: string;
  hourlyRate: string;
  weeklyLimit: string;
  fixedPrice: string;
  projectDuration: string;
  startDate: string;
  contractTitle: string;
  milestones: Array<{ name: string; amount: string }>;
}

export function ContractSummary({
  contractType,
  hourlyRate,
  weeklyLimit,
  fixedPrice,
  projectDuration,
  startDate,
  contractTitle,
  milestones,
}: ContractSummaryProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return "Not set";
    return new Date(dateString).toLocaleDateString();
  };

  const totalMilestoneAmount = milestones.reduce(
    (sum, milestone) => sum + (Number.parseFloat(milestone.amount) || 0),
    0
  );

  return (
    <Card className="sticky top-6">
      <CardHeader>
        <CardTitle>Contract Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-medium text-gray-900 mb-2">
            {contractTitle || "Untitled Contract"}
          </h4>
          <Badge variant="outline" className="text-xs">
            {contractType === "hourly"
              ? "Hourly Contract"
              : "Fixed Price Contract"}
          </Badge>
        </div>

        <div className="space-y-3">
          {contractType === "hourly" ? (
            <>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Hourly Rate:</span>
                <span className="font-medium">${hourlyRate || "0"}/hr</span>
              </div>
              {weeklyLimit && (
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Weekly Limit:</span>
                  <span className="font-medium">{weeklyLimit} hours</span>
                </div>
              )}
            </>
          ) : (
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Fixed Price:</span>
              <span className="font-medium">${fixedPrice || "0"}</span>
            </div>
          )}

          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Duration:</span>
            <span className="font-medium">{projectDuration || "Not set"}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Start Date:</span>
            <span className="font-medium">{formatDate(startDate)}</span>
          </div>
        </div>

        {contractType === "fixed" && milestones.length > 0 && (
          <div className="pt-4 border-t">
            <h4 className="font-medium mb-2">
              Milestones ({milestones.length})
            </h4>
            <div className="space-y-2">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-gray-600 truncate">
                    {milestone.name || `Milestone ${index + 1}`}
                  </span>
                  <span className="font-medium">
                    ${milestone.amount || "0"}
                  </span>
                </div>
              ))}
              <div className="flex justify-between pt-2 border-t font-medium">
                <span>Total:</span>
                <span className="text-green-600">
                  ${totalMilestoneAmount.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="pt-4 border-t">
          <div className="bg-blue-50 rounded-lg p-3">
            <h4 className="font-medium text-blue-900 mb-1">
              What happens next?
            </h4>
            <ul className="text-xs text-blue-800 space-y-1">
              <li>• Freelancer will be notified of the contract</li>
              <li>• They have 7 days to accept the terms</li>
              <li>• Work can begin once both parties agree</li>
              <li>• You can modify terms before acceptance</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
