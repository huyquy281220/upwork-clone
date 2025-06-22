"use client";

import { Button } from "@/components/ui/button";
import CirclePencil from "@/components/common/CirclePencil";
import { Skill } from "@/types";
import { Badge } from "@/components/ui/badge";
import { useQueryClient } from "@tanstack/react-query";
interface SkillsSectionProps {
  skills: string[];
  onEdit?: () => void;
}

export function SkillsSection({ skills, onEdit }: SkillsSectionProps) {
  const queryClient = useQueryClient();
  const allSkills = queryClient.getQueryData<Skill[]>(["skills"]);

  const skillsInJob = allSkills?.filter((skill) => skills.includes(skill.id));

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-foreground">Skills</h3>
        {onEdit && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onEdit}
            className="text-green-500 hover:bg-transparent"
          >
            <CirclePencil />
          </Button>
        )}
      </div>
      <div className="flex gap-2">
        {skillsInJob?.map((skill, index) => (
          <Badge
            key={index}
            variant="secondary"
            className="bg-gray-700 text-white px-3 py-1"
          >
            {skill.name}
          </Badge>
        ))}
      </div>
    </div>
  );
}
