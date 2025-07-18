"use client";

import { useState, useEffect, useMemo } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserSkills } from "@/services/skills";
import { Skill } from "@/types";
import { UserSkill } from "@/types/user";
import { useSession } from "next-auth/react";
import api from "@/services/api";
import { SkillsInput } from "@/components/common/SkillsInput";
import { InfiniteLoading } from "@/components/common/InfiniteLoading";
export interface SkillsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MAX_SKILLS = 15;

export function SkillsModal({ open, onOpenChange }: SkillsModalProps) {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const { data: userSkills } = useQuery<UserSkill[]>({
    queryKey: ["user-skills"],
    queryFn: () => getUserSkills(session?.user.id ?? ""),
    enabled: !!session?.user.id,
  });

  const skillsOfUser = useMemo(
    () => userSkills?.map((skill) => skill.skill) ?? [],
    [userSkills]
  );

  const [skillSelected, setSkillSelected] = useState<Skill[]>(
    skillsOfUser ?? []
  );

  useEffect(() => {
    setSkillSelected(skillsOfUser ?? []);
  }, [skillsOfUser]);

  const handleAddSkill = (skill: Skill) => {
    if (
      skillSelected.length < MAX_SKILLS &&
      !skillSelected.some((s) => s.id === skill.id)
    ) {
      setSkillSelected([...skillSelected, skill]);
    }
  };

  const handleRemoveSkill = (skill: Skill) => {
    setSkillSelected(skillSelected.filter((s) => s.id !== skill.id));
  };

  const handleSave = async () => {
    setStatus("loading");
    try {
      const newSkills = skillSelected.map((skill) => skill.id);

      const response = await api.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user-skills/${session?.user.id}/create`,
        newSkills
      );

      if (response.status !== 201) {
        setStatus("error");
      }

      setStatus("success");

      await queryClient.invalidateQueries({
        queryKey: ["user-skills", session?.user.id],
      });

      setTimeout(() => {
        onOpenChange(false);
      }, 1500);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseModal = () => {
    setStatus("idle");
    onOpenChange(false);
  };

  if (!session) return <InfiniteLoading />;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-3xl min-h-[28rem] bg-background text-foreground border-gray-800"
        showCloseButton={false}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Edit skills</DialogTitle>
          <button
            onClick={handleCloseModal}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          >
            <X className="h-6 w-6" />
          </button>
        </DialogHeader>

        <div>
          <h3 className="mb-2 text-lg font-medium">Skills</h3>

          <div className="relative">
            <SkillsInput onAddSkill={handleAddSkill} />
            <div className="flex flex-wrap gap-2 p-2 min-h-10 rounded-md bg-transparent">
              {skillSelected.map((skill, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-background text-foreground flex items-center gap-1 py-1.5 border border-gray-700"
                >
                  {skill.name}
                  <button
                    onClick={() => handleRemoveSkill(skill)}
                    className="ml-1 rounded-full"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          <p className="text-sm text-gray-400 mt-2">
            Maximum {MAX_SKILLS} skills.
          </p>
        </div>

        {status === "success" && (
          <p className="text-green-500">Edit skills successfully.</p>
        )}
        {status === "error" && (
          <p className="text-red-500">Failed to edit skills.</p>
        )}

        <div className="flex items-end justify-end gap-2 mt-4">
          <Button
            variant="outline"
            onClick={handleCloseModal}
            className="bg-transparent text-green-500 hover:bg-transparent hover:text-green-400 border-0"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-green-600 hover:bg-green-500 text-foreground"
          >
            {status === "loading" ? "Saving..." : "Save"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
