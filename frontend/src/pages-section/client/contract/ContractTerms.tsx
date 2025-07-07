"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { JobType } from "@/types/jobs";

interface ContractTermsProps {
  contractType: "HOURLY" | "FIXED_PRICE";
  setContractType: (type: "HOURLY" | "FIXED_PRICE") => void;
  hourlyRate: number;
  setHourlyRate: (rate: number) => void;
  weeklyLimit: string;
  setWeeklyLimit: (limit: string) => void;
  fixedPrice: number;
  setFixedPrice: (price: number) => void;
  projectDuration: string;
  setProjectDuration: (duration: string) => void;
  startDate: string;
  setStartDate: (date: string) => void;
  contractTitle: string;
  setContractTitle: (title: string) => void;
  description: string;
  setDescription: (description: string) => void;
}

export function ContractTerms({
  contractType,
  setContractType,
  hourlyRate,
  setHourlyRate,
  weeklyLimit,
  setWeeklyLimit,
  fixedPrice,
  setFixedPrice,
  projectDuration,
  setProjectDuration,
  startDate,
  setStartDate,
  contractTitle,
  setContractTitle,
  description,
  setDescription,
}: ContractTermsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contract Terms</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Contract Title */}
        <div>
          <Label htmlFor="contract-title">Contract Title</Label>
          <Input
            id="contract-title"
            value={contractTitle}
            onChange={(e) => setContractTitle(e.target.value)}
            placeholder="Enter contract title"
            className="mt-1"
          />
        </div>

        {/* Contract Type */}
        <div>
          <Label className="text-sm font-medium">Contract Type</Label>
          <div className="flex space-x-4 mt-2">
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="hourly"
                name="contract-type"
                checked={contractType === JobType.HOURLY}
                onChange={() => setContractType("HOURLY")}
                className="w-4 h-4"
              />
              <Label htmlFor="hourly">Hourly</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="fixed"
                name="contract-type"
                checked={contractType === JobType.FIXED_PRICE}
                onChange={() => setContractType("FIXED_PRICE")}
                className="w-4 h-4"
              />
              <Label htmlFor="fixed">Fixed Price</Label>
            </div>
          </div>
        </div>

        {/* Hourly Contract Fields */}
        {contractType === JobType.HOURLY && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="hourly-rate">Hourly Rate</Label>
              <div className="relative mt-1">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  $
                </span>
                <Input
                  id="hourly-rate"
                  type="number"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(+e.target.value)}
                  placeholder={hourlyRate ? hourlyRate.toString() : "0.00"}
                  className="pl-8"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  /hr
                </span>
              </div>

              <p className="text-xs text-gray-500 mt-1">
                Freelancer proposed: ${hourlyRate}/hr
              </p>
            </div>

            <div>
              <Label htmlFor="weekly-limit">Weekly Hour Limit (Optional)</Label>
              <Input
                id="weekly-limit"
                type="number"
                value={weeklyLimit}
                onChange={(e) => setWeeklyLimit(e.target.value)}
                placeholder="40"
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">
                Maximum hours per week
              </p>
            </div>
          </div>
        )}

        {/* Fixed Price Contract Fields */}
        {contractType === JobType.FIXED_PRICE && (
          <div>
            <Label htmlFor="fixed-price">Fixed Price</Label>
            <div className="relative mt-1">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                $
              </span>
              <Input
                id="fixed-price"
                type="number"
                value={fixedPrice}
                onChange={(e) => setFixedPrice(+e.target.value)}
                placeholder={fixedPrice ? fixedPrice.toString() : "0.00"}
                className="pl-8"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Freelancer proposed: ${fixedPrice.toLocaleString()}
            </p>
          </div>
        )}

        {/* Project Duration */}
        <div>
          <Label htmlFor="project-duration">Project Duration</Label>
          <Select value={projectDuration} onValueChange={setProjectDuration}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="less-than-1-week">Less than 1 week</SelectItem>
              <SelectItem value="1-2-weeks">1-2 weeks</SelectItem>
              <SelectItem value="2-4-weeks">2-4 weeks</SelectItem>
              <SelectItem value="1-2-months">1-2 months</SelectItem>
              <SelectItem value="2-3-months">2-3 months</SelectItem>
              <SelectItem value="3-6-months">3-6 months</SelectItem>
              <SelectItem value="more-than-6-months">
                More than 6 months
              </SelectItem>
              <SelectItem value="ongoing">Ongoing</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Start Date */}
        <div>
          <Label htmlFor="start-date">Start Date</Label>
          <Input
            id="start-date"
            type="date"
            value={startDate}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setStartDate(e.target.value)}
            className="mt-1 max-w-36"
          />
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="description">Project Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the work to be done, deliverables, and any specific requirements..."
            className="mt-1 min-h-[120px]"
          />
        </div>
      </CardContent>
    </Card>
  );
}
