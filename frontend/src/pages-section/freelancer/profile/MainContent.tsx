"use client";

import {
  ServiceCard,
  PortfolioCard,
  SkillCard,
} from "@/components/freelancer/profile";
import { ChangeHourlyRateModal } from "@/components/modals/freelancer/ChangeHourlyRateModal";
import { ProfileOverviewModal } from "@/components/modals/freelancer/ProfileOverviewModal";
import { TitleModal } from "@/components/modals/freelancer/TitleModal";
import { useModalManager } from "@/hooks/useModalManager";
import { useUser } from "@/hooks/useUserInfo";
import { User } from "@/types/user";
import { useSession } from "next-auth/react";

export function MainContent() {
  const { data: session } = useSession();
  const { data: user } = useUser<User>(session?.user?.id ?? "");
  const { openModal, closeModal, isModalOpen } = useModalManager();

  return (
    <div className="space-y-8">
      <div className="grid gap-6">
        <ServiceCard
          title={user?.freelancerProfile?.title ?? ""}
          price={user?.freelancerProfile?.hourlyRate?.toString() ?? ""}
          description={user?.freelancerProfile?.overview ?? ""}
          onEditTitle={() => openModal("title")}
          onEditRate={() => openModal("hourlyRate")}
          onEditOverview={() => openModal("overview")}
        />
      </div>
      <PortfolioCard />
      <SkillCard />

      <TitleModal
        open={isModalOpen("title")}
        onOpenChange={() => closeModal()}
        currentTitle={user?.freelancerProfile?.title ?? ""}
        userId={session?.user?.id ?? ""}
      />
      <ProfileOverviewModal
        open={isModalOpen("overview")}
        onOpenChange={() => closeModal()}
        currentOverview={user?.freelancerProfile?.overview ?? ""}
        userId={session?.user?.id ?? ""}
      />
      <ChangeHourlyRateModal
        open={isModalOpen("hourlyRate")}
        onOpenChange={() => closeModal()}
        currentRate={user?.freelancerProfile?.hourlyRate ?? 0}
        userId={session?.user?.id ?? ""}
      />
    </div>
  );
}
