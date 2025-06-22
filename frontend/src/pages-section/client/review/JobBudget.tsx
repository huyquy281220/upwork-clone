"use client";

import { Button } from "@/components/ui/button";
import { JobType } from "@/types/jobs";
import CirclePencil from "@/components/common/CirclePencil";

interface BudgetSectionProps {
  jobType: JobType;
  hourlyRateMin?: number;
  hourlyRateMax?: number;
  fixedPrice?: number;
  onEdit?: () => void;
}

export function BudgetSection({
  jobType,
  hourlyRateMin,
  hourlyRateMax,
  fixedPrice,
  onEdit,
}: BudgetSectionProps) {
  const getBudgetText = () => {
    if (jobType === JobType.HOURLY && hourlyRateMin && hourlyRateMax) {
      return `$${hourlyRateMin.toFixed(2)} - $${hourlyRateMax.toFixed(2)} /hr`;
    } else if (jobType === JobType.FIXED_PRICE && fixedPrice) {
      return `$${fixedPrice.toFixed(2)}`;
    }
    return "Set your budget";
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-foreground">Budget</h3>
        {onEdit && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onEdit}
            className="text-green-500 hover:bg-transparent"
          >
            <CirclePencil />
          </Button>
        )}
      </div>
      <div className="text-foreground">{getBudgetText()}</div>
    </div>
  );
}
