import React from "react";

interface SkillBadgeProps {
  skill: string;
}

export const SkillBadge = ({ skill }: SkillBadgeProps) => (
  <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded">
    {skill}
  </span>
);
