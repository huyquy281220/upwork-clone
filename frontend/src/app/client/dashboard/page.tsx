"use client";

import { getAllJobs } from "@/services/jobs";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import {
  WelcomeSection,
  LastStepsSection,
  HelpResourcesSection,
  PaymentsSafetySection,
  OverviewSection,
  ConsultationSection,
} from "@/pages-section/client/dashboard";

export default function DashboardPage() {
  const { data: session } = useSession();
  useQuery({
    queryKey: ["jobs", session?.user.id],
    queryFn: () => getAllJobs(session?.user.id ?? ""),
    enabled: !!session?.user.id,
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-6 space-y-8">
        <WelcomeSection />
        <LastStepsSection />
        <OverviewSection />
        <ConsultationSection />
        <PaymentsSafetySection />
        <HelpResourcesSection />
      </div>
    </div>
  );
}
