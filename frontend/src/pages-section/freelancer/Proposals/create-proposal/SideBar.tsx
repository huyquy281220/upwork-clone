import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, DollarSign, MapPin, Star, Users } from "lucide-react";

interface ProposalSidebarProps {
  jobData: {
    title: string;
    description: string;
    budget: { type: string; min?: number; max?: number; amount?: number };
    duration: string;
    proposalsCount: number;
    client: {
      name: string;
      avatar: string;
      location: string;
      rating: number;
      verified: boolean;
    };
    skills: string[];
  };
}

export function ProposalSidebar({ jobData }: ProposalSidebarProps) {
  const formatBudget = (budget: any) => {
    if (budget.type === "hourly") {
      return `$${budget.min}-$${budget.max}/hr`;
    } else {
      return `$${budget.amount?.toLocaleString()}`;
    }
  };

  return (
    <Card className="sticky top-8">
      <CardHeader>
        <CardTitle className="text-lg">Job Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">{jobData.title}</h3>
          <p className="text-sm text-gray-600 line-clamp-4">
            {jobData.description}
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-sm">
            <DollarSign className="w-4 h-4 text-gray-400" />
            <span className="font-medium">{formatBudget(jobData.budget)}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Clock className="w-4 h-4 text-gray-400" />
            <span>{jobData.duration}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Users className="w-4 h-4 text-gray-400" />
            <span>{jobData.proposalsCount} proposals</span>
          </div>
        </div>

        <div className="flex items-center space-x-3 pt-4 border-t">
          <Avatar className="w-10 h-10">
            <AvatarImage src={jobData.client.avatar || "/placeholder.svg"} />
            <AvatarFallback>
              {jobData.client.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-medium text-sm">{jobData.client.name}</span>
              {jobData.client.verified && (
                <Badge
                  variant="outline"
                  className="bg-blue-50 text-blue-700 border-blue-200 text-xs"
                >
                  Verified
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-3 text-xs text-gray-600">
              <div className="flex items-center space-x-1">
                <MapPin className="w-3 h-3" />
                <span>{jobData.client.location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span>{jobData.client.rating}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 pt-4 border-t">
          {jobData.skills.map((skill, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
