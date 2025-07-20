"use client";

import { AccountSection } from "./components/AccountSection";
import { CompanyDetailsSection } from "./components/CompanyDetail";
import { CompanyContactsSection } from "./components/CompanyContract";
import { InfiniteLoading } from "@/components/common/InfiniteLoading";
import { useSession } from "next-auth/react";
import { useUser } from "@/hooks/useUserInfo";
import { BaseUser } from "@/types/user";
import { useModalManager } from "@/hooks/useModalManager";

export function MyInfoContent() {
  const { data: session } = useSession();
  const { data: user } = useUser<BaseUser>(session?.user?.id ?? "");
  const { openModal, isModalOpen, closeModal } = useModalManager();

  if (!session || !user) return <InfiniteLoading />;

  return (
    <div className="flex-1 p-8 ">
      <div className="max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-foreground mb-2">
            My Info
          </h1>
          <p className="text-muted-foreground">This is a client account</p>
        </div>

        <div className="space-y-6">
          <AccountSection
            fullName={user.fullName ?? ""}
            email={user.email ?? ""}
            avatar={user.avatarUrl ?? ""}
            isOpen={isModalOpen("edit-account-info")}
            onClose={closeModal}
            onOpen={() => openModal("edit-account-info")}
            isOpenAvatar={isModalOpen("image-upload")}
            onOpenAvatar={() => openModal("image-upload")}
            onCloseAvatar={() => closeModal()}
          />
          <CompanyDetailsSection />
          <CompanyContactsSection />
        </div>
      </div>
    </div>
  );
}
