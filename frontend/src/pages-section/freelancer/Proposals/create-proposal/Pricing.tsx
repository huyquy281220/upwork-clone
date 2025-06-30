"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PricingSectionProps {
  pricing: number;
  setPricing: (value: number) => void;
}

export function PricingSection({ pricing, setPricing }: PricingSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pricing</CardTitle>
        <p className="text-sm text-gray-600">Set your rate for this project.</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* <div className="flex space-x-4">
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="hourly"
              name="pricing"
              checked={proposalType === "hourly"}
              onChange={() => setProposalType("hourly")}
              className="w-4 h-4"
            />
            <label htmlFor="hourly">Hourly rate</label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="fixed"
              name="pricing"
              checked={proposalType === "fixed"}
              onChange={() => setProposalType("fixed")}
              className="w-4 h-4"
            />
            <label htmlFor="fixed">Fixed price</label>
          </div>
        </div> */}

        <div>
          <label htmlFor="fixed-price">Fixed Price</label>
          <div className="relative mt-1">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              $
            </span>
            <input
              id="fixed-price"
              type="number"
              placeholder="0.00"
              value={pricing}
              onChange={(e) => setPricing(Number(e.target.value))}
              className="pl-8"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
