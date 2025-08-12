"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, DollarSign, FileText } from "lucide-react";

interface ContractTermsProps {
  contract: {
    title: string;
    description: string;
    type: "hourly" | "fixed";
    hourlyRate?: number;
    weeklyLimit?: number;
    fixedPrice?: number;
    duration: string;
    startDate: string;
    skills: string[];
  };
}

export function ContractTerms({ contract }: ContractTermsProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <FileText className="w-5 h-5" />
          <span>Contract Terms</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Contract Title */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {contract.title}
          </h3>
          <Badge variant="outline" className="text-xs">
            {contract.type === "hourly"
              ? "Hourly Contract"
              : "Fixed Price Contract"}
          </Badge>
        </div>

        {/* Contract Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Payment Terms */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 flex items-center space-x-2">
              <DollarSign className="w-4 h-4" />
              <span>Payment Terms</span>
            </h4>

            {contract.type === "hourly" ? (
              <div className="bg-green-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-600 mb-1">
                  ${contract.hourlyRate}/hr
                </div>
                <p className="text-sm text-gray-600">Hourly rate</p>
                {contract.weeklyLimit && (
                  <p className="text-xs text-gray-500 mt-2">
                    Weekly limit: {contract.weeklyLimit} hours
                  </p>
                )}
              </div>
            ) : (
              <div className="bg-green-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-600 mb-1">
                  ${contract.fixedPrice?.toLocaleString()}
                </div>
                <p className="text-sm text-gray-600">Fixed price</p>
              </div>
            )}
          </div>

          {/* Timeline */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>Timeline</span>
            </h4>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Duration:</span>
                <span className="text-sm font-medium">{contract.duration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Start date:</span>
                <span className="text-sm font-medium">
                  {formatDate(contract.startDate)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Project Description */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">
            Project Description
          </h4>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-700 whitespace-pre-line">
              {contract.description}
            </p>
          </div>
        </div>

        {/* Required Skills */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Required Skills</h4>
          <div className="flex flex-wrap gap-2">
            {contract.skills.map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* Payment Protection */}
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">Payment Protection</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Payments are secured through our platform</li>
            <li>
              •{" "}
              {contract.type === "hourly"
                ? "Weekly payments for logged hours"
                : "Milestone-based payments"}
            </li>
            <li>• Dispute resolution support available</li>
            <li>• Client payment method verified</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
