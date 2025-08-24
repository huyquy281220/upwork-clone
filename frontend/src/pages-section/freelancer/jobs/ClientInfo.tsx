import { StarRating } from "@/components/common/StarRating";
import { useUserLocationTime } from "@/hooks/useUserLocalTime";
import { ClientUser } from "@/types/user";
import { MapPin, Clock } from "lucide-react";

export function ClientInfo({
  client,
  totalJobs,
  openJobs,
  hireRate,
  totalSpent,
}: {
  client: ClientUser & {
    user: { fullName: string; address: string; createdAt: string };
  };
  totalJobs: number;
  openJobs: number;
  hireRate: number;
  totalSpent: number;
}) {
  const clientLocalTime = useUserLocationTime(client.timezone);

  const clientStats = [
    { label: client.user.address ?? "", icon: MapPin },
    {
      label: `${clientLocalTime?.city} ${clientLocalTime?.localTime}`,
      icon: Clock,
    },
    {
      label: `${totalJobs} jobs posted`,
      value: `${hireRate}% hire rate, ${openJobs} open jobs`,
    },
    { label: `$${totalSpent} total spent`, value: "" },
    { label: `Member since ${client.user.createdAt}` },
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
                <div className="text-muted-foreground">{stat.label}</div>
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
