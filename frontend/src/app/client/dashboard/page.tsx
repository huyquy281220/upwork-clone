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
import { useJobPostingContext } from "@/store/JobPostingContext";
import { useEffect } from "react";
import { useUser } from "@/hooks/useUserInfo";
import { BaseUser } from "@/types/user";
import VerifyEmailModal from "@/components/modals/shared/VerifyEmailModal";
import { useModalManager } from "@/hooks/useModalManager";

export default function DashboardPage() {
  const { data: session } = useSession();
  const { data: user } = useUser<BaseUser>(session?.user.id ?? "");
  const { resetJobData } = useJobPostingContext();
  const { openModal, closeModal, isModalOpen } = useModalManager();

  useQuery({
    queryKey: ["jobs", session?.user.id],
    queryFn: () => getAllJobs(session?.user.id ?? ""),
    enabled: !!session?.user.id,
  });

  useEffect(() => {
    resetJobData();
  }, []);

  useEffect(() => {
    if (!user?.verified) {
      openModal("verify-email");
    } else {
      closeModal();
    }
  }, [user, session]);

  if (!session || !user) return;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-6 space-y-8">
        <WelcomeSection />
        <LastStepsSection
          emailVerified={user.verified}
          phoneVerified={false}
          paymentVerified={false}
        />
        <OverviewSection />
        <ConsultationSection />
        <PaymentsSafetySection />
        <HelpResourcesSection />
        <VerifyEmailModal
          isOpen={isModalOpen("verify-email")}
          onClose={closeModal}
          email={user.email}
        />
      </div>
    </div>
  );
}
