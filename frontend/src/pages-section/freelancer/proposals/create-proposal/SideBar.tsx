import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { JobDetailProps, JobType } from "@/types/jobs";
import { Clock, DollarSign, MapPin, Star, Users } from "lucide-react";

interface ProposalSidebarProps {
  jobData: JobDetailProps;
}

export function ProposalSidebar({ jobData }: ProposalSidebarProps) {
  console.log(jobData);
  console.log(jobData.proposals);
  const formatBudget = (jobType: JobType) => {
    if (jobType === JobType.HOURLY) {
      return `$${jobData.hourlyRateMin}-$${jobData.hourlyRateMax}/hr`;
    } else {
      return `$${jobData.fixedPrice}`;
    }
  };

  return (
    <Card className="sticky top-8">
      <CardHeader>
        <CardTitle className="text-lg">Job Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold text-foreground mb-2">
            {jobData.title}
          </h3>
          <p className="text-sm text-foreground opacity-75 line-clamp-4">
            {jobData.description}
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-sm">
            <DollarSign className="w-4 h-4 text-gray-400" />
            <span className="font-medium">{formatBudget(jobData.jobType)}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Clock className="w-4 h-4 text-gray-400" />
            <span>{jobData.jobDuration}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Users className="w-4 h-4 text-gray-400" />
            <span>{jobData.proposals.length} proposals</span>
          </div>
        </div>

        <div className="flex items-center space-x-3 pt-4 border-t">
          <Avatar className="w-10 h-10">
            <AvatarImage
              src={jobData.client.user.avatarUrl || "/placeholder.svg"}
            />
            <AvatarFallback>
              {jobData.client.user.fullName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-medium text-sm">
                {jobData.client.user.fullName}
              </span>
              {jobData.client.user.verified && (
                <Badge
                  variant="outline"
                  className="bg-blue-50 text-blue-700 border-blue-200 text-xs"
                >
                  Verified
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-3 text-xs text-foreground opacity-75">
              <div className="flex items-center space-x-1">
                <MapPin className="w-3 h-3" />
                <span>{jobData.client.user.address}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                {/* <span>{jobData.client.rating}</span> */}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 pt-4 border-t">
          {jobData.skills.map((skill, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="bg-background text-foreground flex items-center gap-1 py-1.5 border border-gray-700"
            >
              {skill.name}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
