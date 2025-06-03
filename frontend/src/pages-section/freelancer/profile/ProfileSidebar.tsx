"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MapPin, Clock, Pencil, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getUserById } from "@/services/userService";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import JobSkeletion from "@/components/common/JobSkeletion";

export function ProfileSidebar() {
  const pathname = usePathname();
  const id = pathname.split("/")[2];
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUserById(id),
  });

  if (!user) return <JobSkeletion />;

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="bg-card">
        <CardHeader className="text-center">
          <Avatar className="w-20 h-20 mx-auto mb-4">
            <AvatarImage
              src="/placeholder.svg?height=80&width=80"
              alt="Hai H."
            />
            <AvatarFallback>HH</AvatarFallback>
          </Avatar>
          <h1 className="text-2xl font-bold">{user.fullName}</h1>
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>Hanoi, Vietnam</span>
            <span>•</span>
            <Clock className="w-4 h-4" />
            <span>4:32 pm local time</span>
          </div>
          <div className="flex justify-center gap-2 pt-6">
            <Button
              variant="outline"
              size="sm"
              className="text-green-600 border-green-600"
            >
              See public view
            </Button>
            <Button
              size="sm"
              className="bg-green-600 hover:bg-green-700 text-foreground"
            >
              Profile settings
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Connects */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Connects: 0</h3>
          </div>
          <div className="flex gap-2">
            <Button variant="link" className="text-green-600 p-0">
              View details
            </Button>
            <Button variant="link" className="text-green-600 p-0">
              Buy Connects
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Verification Items */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <p className="font-medium">Hours per week</p>
              <Pencil className="w-4 h-4 text-green-600 cursor-pointer" />
            </div>

            <p className="text-sm text-muted-foreground">
              Less than 30 hrs/week
            </p>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <p className="font-medium">Languages</p>
              <Pencil className="w-4 h-4 text-green-600 cursor-pointer" />
            </div>

            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">English: </span>
              Basic
            </p>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <p className="font-medium">Education</p>
              <Pencil className="w-4 h-4 text-green-600 cursor-pointer" />
            </div>

            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">
                Bachelor of Science in Computer Science
              </span>
            </p>
          </div>

          <div>
            <p>Linked account</p>
            <Button
              variant="link"
              className="flex justify-center w-full mt-2 text-green-600 p-0 border border-green-600 rounded-full"
            >
              <Github className="w-4 h-4" />
              <span>Github</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
