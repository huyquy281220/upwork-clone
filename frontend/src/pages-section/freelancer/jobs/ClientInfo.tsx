import { StarRating } from "@/components/common/StarRating";
import { MapPin, Clock } from "lucide-react";

export function ClientInfo() {
  const clientStats = [
    { label: "United States", icon: MapPin },
    { label: "Aurora 7:36 AM", icon: Clock },
    { label: "133 jobs posted", value: "86% hire rate, 0 open jobs" },
    { label: "$340K total spent", value: "$7 /hr avg. hourly rate" },
    { label: "Member since Jul 16, 2024" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">
          About the client
        </h3>
        <div className="flex items-center gap-2 mb-2">
          <StarRating rating={4.9} />
          <span className="font-semibold">4.9</span>
          <span className="text-muted-foreground">(49)</span>
        </div>
        <p className="text-sm text-muted-foreground mb-4">4.9 of 5 stars</p>

        <div className="space-y-3">
          {clientStats.map((stat, index) => (
            <div key={index} className="flex items-start gap-2 text-sm">
              {stat.icon && (
                <stat.icon className="w-4 h-4 text-muted-foreground mt-0.5" />
              )}
              <div>
                <div className="text-foreground">{stat.label}</div>
                {stat.value && (
                  <div className="text-muted-foreground">{stat.value}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-foreground mb-2">Job link</h4>
        <div className="bg-muted p-3 rounded text-sm text-muted-foreground">
          Copy link
        </div>
      </div>
    </div>
  );
}
