import React from "react";
import { SkillBadge } from "@/components/freelancer/jobs/SkillBadge";

export const JobSkills = () => {
  const skills = [
    "Mandarin",
    "Customer Service",
    "Email Support",
    "Communication",
    "Problem Solving",
    "CRM Software",
    "Remote Work",
    "Technical Support",
    "E-commerce",
  ];

  return (
    <div className="border-b pb-6 mt-6">
      <h2 className="text-xl font-bold text-gray-800 mb-3">
        Skills and Expertise
      </h2>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <SkillBadge key={index} skill={skill} />
        ))}
      </div>
    </div>
  );
};
