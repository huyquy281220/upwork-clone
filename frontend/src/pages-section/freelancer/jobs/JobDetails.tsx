import { ExperienceLevel, JobType as JobDetailType } from "@/types/jobs";
import { DollarSign, BarChart3 } from "lucide-react";

interface JobDetail {
  experienceLevel: ExperienceLevel;
  jobType: JobDetailType;
  fixedPrice?: number;
  hourlyRateMin?: number;
  hourlyRateMax?: number;
}

const jobTypeLabels = {
  HOURLY: "Hourly",
  FIXED_PRICE: "Fixed-price",
};

const rateLabels: Record<string, string> = {
  Expert: "high",
  Intermediate: "medium",
  "Entry Level": "lowest",
};

export function JobDetails({
  experienceLevel,
  fixedPrice,
  hourlyRateMax,
  jobType,
  hourlyRateMin,
}: JobDetail) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex items-start gap-3 p-4 border rounded-lg">
        <DollarSign className="w-5 h-5 text-muted-foreground mt-1" />
        <div>
          <div className="font-medium text-foreground">
            {jobType === JobDetailType.HOURLY ? (
              <p>
                ${hourlyRateMin} - ${hourlyRateMax}
              </p>
            ) : (
              <p>${fixedPrice}</p>
            )}
          </div>
          <div className="text-sm text-muted-foreground">
            {jobTypeLabels[jobType as keyof typeof jobTypeLabels]}
          </div>
        </div>
      </div>

      <div className="flex items-start gap-3 p-4 border rounded-lg">
        <BarChart3 className="w-5 h-5 text-muted-foreground mt-1" />
        <div>
          <div className="font-semibold text-foreground">{experienceLevel}</div>
          <div className="text-sm text-muted-foreground">
            I am looking for freelancers with the {rateLabels[experienceLevel]}{" "}
            rates
          </div>
        </div>
      </div>
    </div>
  );
}
