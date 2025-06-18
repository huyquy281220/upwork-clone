"use client";

import { ConsultantSlider } from "./components/ConsultantSlider";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const consultants = [
  {
    id: 1,
    name: "Aman S.",
    location: "India",
    rating: "100%",
    jobSuccess: "40 Jobs",
    rate: "$20/hr",
    title: "Full Stack PHP Developer",
    description:
      "Hi there! I am Aman, a Full Stack Developer with 7+ years of extensive experience in godot, I achieve industry. I have delivered 500+...",
    duration: "$9 per 30 minutes Zoom meeting",
    avatar: "/placeholder.svg?height=40&width=40&text=AS",
  },
  {
    id: 2,
    name: "Saurabh D.",
    location: "India",
    rating: "100%",
    jobSuccess: "31 Jobs",
    rate: "$20/hr",
    title: "Full Stack | Laravel | AWS | React | Node | Next",
    description:
      "Hi there! I am a Full Stack Developer with over 8 years of experience developing high-quality websites and web...",
    duration: "$5 per 30 minutes Zoom meeting",
    avatar: "/placeholder.svg?height=40&width=40&text=SD",
  },
  {
    id: 3,
    name: "Ameer H.",
    location: "Pakistan",
    rating: "100%",
    jobSuccess: "115 Jobs",
    rate: "$25/hr",
    title:
      "Full Stack WordPress Website Designer & Developer (Front-end & Ba...",
    description:
      "Over 10 years of experience in Web Design and Development ✅ Completed or...",
    duration: "$25 per 30 minutes Zoom meeting",
    avatar: "/placeholder.svg?height=40&width=40&text=AH",
  },
  {
    id: 4,
    name: "Ameer H.",
    location: "Pakistan",
    rating: "100%",
    jobSuccess: "115 Jobs",
    rate: "$25/hr",
    title:
      "Full Stack WordPress Website Designer & Developer (Front-end & Ba...",
    description:
      "Over 10 years of experience in Web Design and Development ✅ Completed or...",
    duration: "$25 per 30 minutes Zoom meeting",
    avatar: "/placeholder.svg?height=40&width=40&text=AH",
  },
  {
    id: 5,
    name: "Ameer H.",
    location: "Pakistan",
    rating: "100%",
    jobSuccess: "115 Jobs",
    rate: "$25/hr",
    title:
      "Full Stack WordPress Website Designer & Developer (Front-end & Ba...",
    description:
      "Over 10 years of experience in Web Design and Development ✅ Completed or...",
    duration: "$25 per 30 minutes Zoom meeting",
    avatar: "/placeholder.svg?height=40&width=40&text=AH",
  },
];

export function ConsultationSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium text-foreground">
          Review your project&#39;s goals with an expert, one-on-one
        </h2>
        <Button variant="ghost" className="text-green-600 hover:text-green-700">
          Browse consultations
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      <div>
        <ConsultantSlider consultants={consultants} />
      </div>
    </div>
  );
}
