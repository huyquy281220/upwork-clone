"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SkillBadge } from "@/components/common/SkillBadge";
import CirclePencil from "@/components/common/CirclePencil";
import { SkillsModal } from "@/components/modals/freelancer/EditSkillModal";
import { useModalManager } from "@/hooks/useModalManager";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { getUserSkills } from "@/services/skills";
import { UserSkill } from "@/types/user";
import { InfiniteLoading } from "@/components/common/InfiniteLoading";

export function SkillCard() {
  const { data: session } = useSession();

  const userId = session?.user.id;

  const { data: userSkills, isLoading } = useQuery<UserSkill[]>({
    queryKey: ["user-skills", session?.user.id],
    queryFn: () => getUserSkills(userId ?? ""),
    enabled: !!userId,
  });
  const { openModal, closeModal, isModalOpen } = useModalManager();

  if (isLoading || !session) return <InfiniteLoading />;

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-semibold">Skills</h3>
            <CirclePencil onEdit={() => openModal("skills")} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {userSkills?.map((skill, index) => (
              <SkillBadge key={index} skill={skill.skill.name} />
            ))}
          </div>
        </CardContent>
      </Card>
      <SkillsModal
        open={isModalOpen("skills")}
        onOpenChange={() => closeModal()}
      />
    </>
  );
}
