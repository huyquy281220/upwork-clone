"use client";

import VerifyEmailModal from "@/components/modals/shared/VerifyEmailModal";
import { useModalManager } from "@/hooks/useModalManager";
import { useUser } from "@/hooks/useUserInfo";
import { useUserLocationTime } from "@/hooks/useUserLocalTime";
import { JobListing, UserSidebar } from "@/pages-section/freelancer/find-work";
import { BaseUser } from "@/types/user";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function FindWork() {
  const { data: session } = useSession();
  const { data: user } = useUser<BaseUser>(session?.user.id ?? "");
  useUserLocationTime(user?.timezone);

  const { openModal, closeModal, isModalOpen } = useModalManager();

  useEffect(() => {
    if (!user?.verified) {
      openModal("verify-email");
    } else {
      closeModal();
    }
  }, [user, session]);

  if (!session || !user) return;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-3">
            <JobListing />
          </div>
          <div className="lg:col-span-1">
            <UserSidebar />
          </div>
        </div>
      </div>

      <VerifyEmailModal
        isOpen={isModalOpen("verify-email")}
        onClose={closeModal}
        email={user.email}
      />
    </div>
  );
}
