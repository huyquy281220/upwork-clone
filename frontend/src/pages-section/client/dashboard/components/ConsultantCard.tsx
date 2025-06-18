import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, Video } from "lucide-react";

interface ConsultantCardProps {
  name: string;
  location: string;
  rating: string;
  jobSuccess: string;
  rate: string;
  title: string;
  description: string;
  duration: string;
  avatar: string;
}

export function ConsultantCard({
  name,
  location,
  rating,
  jobSuccess,
  rate,
  title,
  description,
  duration,
  avatar,
}: ConsultantCardProps) {
  return (
    <Card className="bg-card border-border h-full">
      <CardContent className="p-8 space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={avatar || "/placeholder.svg"} alt={name} />
              <AvatarFallback>
                {name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium text-foreground">{name}</h3>
              <p className="text-sm text-muted-foreground">{location}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="p-1">
            <Heart className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <span className="text-green-600">{rating}</span>
          <span className="text-muted-foreground">{jobSuccess}</span>
          <span className="text-foreground">{rate}</span>
        </div>

        <h4 className="font-medium text-foreground text-sm leading-tight">
          {title}
        </h4>

        <p className="text-sm text-muted-foreground line-clamp-3">
          {description}
        </p>

        <div className="flex items-center gap-2 text-sm text-green-600">
          <Video className="w-4 h-4" />
          <span>{duration}</span>
        </div>

        <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
          Book a consultation
        </Button>
      </CardContent>
    </Card>
  );
}
