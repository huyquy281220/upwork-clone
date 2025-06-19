"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Search, X, Info } from "lucide-react";
import { useJobPosting } from "@/hooks/useJobPosting";

const POPULAR_SKILLS = [
  "Microsoft Windows",
  "Russian",
  "Translation",
  "Smartphone",
  "Android",
  "Arabic",
  "Mobile App Development",
  "Java",
  "English",
  "iOS",
  "Data Entry",
  "Web Development",
  "SQLite",
  "PHP",
  "Web Design",
  "HTML",
  "Python",
  "Usability Testing",
  "In-App Purchases",
  "Camera",
];

const SKILL_SUGGESTIONS = [
  "Website Translation",
  "Web & Mobile Design Consultation",
  "Web API",
  "Web Accessibility",
  "Web Analytics",
  "Web Analytics Bug Fix",
  "Web Analytics Report",
  "Web Analytics Software",
];

export default function Step2Skills() {
  const { jobData, updateJobData } = useJobPosting();
  const [skillSearch, setSkillSearch] = useState("");
  const [showSkillDropdown, setShowSkillDropdown] = useState(false);

  const addSkill = (skill: string) => {
    if (!jobData.skills.includes(skill)) {
      updateJobData({ skills: [...jobData.skills, skill] });
    }
    setSkillSearch("");
    setShowSkillDropdown(false);
  };

  const removeSkill = (skill: string) => {
    updateJobData({ skills: jobData.skills.filter((s) => s !== skill) });
  };

  return (
    <div className="grid grid-cols-2 gap-12  mx-auto">
      <div>
        <div className="text-sm text-foreground mb-2">2/5 Job post</div>
        <h1 className="text-4xl font-bold text-foreground mb-6">
          What are the main skills required for your work?
        </h1>
      </div>
      <div>
        <label className="text-foreground text-lg mb-4 block">
          Search skills or add your own
        </label>
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white w-5 h-5" />
          <input
            value={skillSearch}
            onChange={(e) => {
              setSkillSearch(e.target.value);
              setShowSkillDropdown(e.target.value.length > 0);
            }}
            className="w-full bg-gray-800 border-gray-600 text-white pl-12 py-3"
            placeholder="Search skills"
          />
          {showSkillDropdown && (
            <div className="absolute top-full left-0 right-0 bg-gray-800 border border-gray-600 rounded-b-md max-h-60 overflow-y-auto z-10">
              {SKILL_SUGGESTIONS.filter((skill) =>
                skill.toLowerCase().includes(skillSearch.toLowerCase())
              ).map((skill) => (
                <button
                  key={skill}
                  onClick={() => addSkill(skill)}
                  className="w-full text-left px-4 py-2 text-white hover:bg-gray-700"
                >
                  {skill}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="text-sm text-foreground mb-4 flex items-center">
          <Info className="w-4 h-4 mr-2" />
          For the best results, add 3-5 skills
        </div>

        {jobData.skills.length > 0 && (
          <div className="mb-6">
            <h3 className="text-foreground font-semibold mb-3">
              Selected skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {jobData.skills.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="bg-gray-700 text-white px-3 py-1"
                >
                  {skill}
                  <button
                    onClick={() => removeSkill(skill)}
                    className="ml-2 hover:text-red-400"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div>
          <h3 className="text-foreground font-semibold mb-4">
            Popular skills for General Translation Services
          </h3>
          <div className="flex flex-wrap gap-2">
            {POPULAR_SKILLS.map((skill) => (
              <button
                key={skill}
                onClick={() => addSkill(skill)}
                className="bg-gray-700 text-white px-3 py-2 rounded-full text-sm hover:bg-gray-600 flex items-center"
              >
                {skill}
                <span className="ml-2 text-lg">+</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
