"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
import { JobType } from "@/types/jobs";

interface PricingSectionProps {
  pricing: number;
  setPricing: (value: number) => void;
  jobType: JobType;
}

export function PricingSection({
  pricing,
  setPricing,
  jobType,
}: PricingSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pricing</CardTitle>
        <p className="text-sm text-foreground opacity-80">
          Set your rate for this project.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {jobType === JobType.HOURLY ? (
          <div>
            <label htmlFor="hourly-rate">Hourly Rate</label>
            <div className="relative mt-1">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                $
              </span>
              <input
                id="hourly-rate"
                type="number"
                placeholder="0.00"
                defaultValue={pricing}
                // value={pricing}
                onChange={(e) => setPricing(Number(e.target.value))}
                className="h-8 pl-8 max-w-32 rounded-sm"
              />
              <span className="ml-2 text-gray-500">/hr</span>
            </div>
          </div>
        ) : jobType === JobType.FIXED_PRICE ? (
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
                className="h-8 pl-8 max-w-32 rounded-sm"
              />
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
