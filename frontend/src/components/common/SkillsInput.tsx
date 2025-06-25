"use client";

import { useDebounce } from "@/hooks/useDebounce";
import { getSkillsByName } from "@/services/skills";
import { Skill } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SkillsInputProps {
  onAddSkill: (skill: Skill) => void;
  classes?: string;
}

export const SkillsInput = ({ onAddSkill, classes }: SkillsInputProps) => {
  const [searchValue, setSearchValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const searchValueDebounced = useDebounce(searchValue, 300);

  const {
    data: skills,
    isLoading,
    isError,
  } = useQuery<Skill[]>({
    queryKey: ["skills-search-by-name", searchValueDebounced],
    queryFn: () => getSkillsByName(searchValueDebounced),
    enabled: !!searchValueDebounced && isFocused,
  });

  const handleAddSkillAndClearInput = (skill: Skill) => {
    onAddSkill(skill);
    setSearchValue("");
  };

  const showDropdown = isFocused && searchValue;

  return (
    <div className={cn("relative", classes ?? "")}>
      <div className="flex flex-wrap gap-2 p-2 min-h-10 rounded-md border border-gray-700 bg-transparent">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder="Search skills"
          className="flex-1 min-w-[120px] h-8 bg-transparent border-0 focus-visible:bg-none p-0 pl-2"
        />
      </div>

      {showDropdown && (
        <div className="absolute z-10 w-full mt-1 max-h-56 overflow-auto rounded-md border border-gray-700 bg-background p-1">
          {isLoading ? (
            <div className="flex items-center justify-center p-3 text-sm text-gray-400">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Searching...
            </div>
          ) : isError ? (
            <div className="p-3 text-sm text-red-500">
              Error fetching skills.
            </div>
          ) : skills && skills.length > 0 ? (
            skills.map((skill, index) => (
              <button
                key={index}
                className="w-full text-left px-3 py-2 hover:bg-gray-800 focus:bg-gray-800 focus:outline-none rounded-md"
                onClick={() => handleAddSkillAndClearInput(skill)}
              >
                {skill.name}
              </button>
            ))
          ) : (
            <div className="p-3 text-sm text-gray-400">No results found.</div>
          )}
        </div>
      )}
    </div>
  );
};
