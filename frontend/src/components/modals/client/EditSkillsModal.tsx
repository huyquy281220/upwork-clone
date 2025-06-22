"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Search, X, Plus } from "lucide-react";
import { Skill } from "@/types";
import { useQueryClient } from "@tanstack/react-query";

interface EditSkillsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSkills: Skill[];
  jobTitle: string;
  onSave: (skills: string[]) => void;
}
//   "Mobile App Testing",
//   "Automated Testing",
//   "Functional Testing",
//   "Web Testing",
//   "Usability Testing",
//   "JUnit",
//   "Manual Testing",
//   "Bug Reports",
//   "Software Testing",
//   "Test Automation Framework",
//   "Black Box Testing",
//   "Jira",
//   "Performance Testing",
//   "Product Stability",
//   "Quality Assurance",
//   "QA Engineering",
//   "Regression Test Script",
//   "Selenium",
//   "Task Creation",
//   "Test Case Design",
// ];

export function EditSkillsModal({
  isOpen,
  onClose,
  currentSkills,
  jobTitle,
  onSave,
}: EditSkillsModalProps) {
  const queryClient = useQueryClient();
  const allSkills = queryClient.getQueryData<Skill[]>(["skills"]);
  const [skills, setSkills] = useState<Skill[]>(currentSkills);
  const [searchTerm, setSearchTerm] = useState("");

  const popularSkills = allSkills
    ?.filter((skill) =>
      skill.name.toLowerCase().includes(jobTitle.toLowerCase())
    )
    .filter((skill) => !currentSkills.some((s) => s.id === skill.id));

  const handleAddSkill = (skill: string) => {
    const skillToAdd = allSkills?.find((s) => s.id === skill);
    if (skillToAdd) {
      setSkills([...skills, skillToAdd]);
      setSearchTerm("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill.id !== skillToRemove));
  };

  const handleSave = () => {
    const skillIds = skills.map((skill) => skill.id);
    onSave(skillIds);
    onClose();
  };

  const filteredSkills = allSkills
    ?.filter((skill) =>
      skill.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((skill) => !currentSkills.some((s) => s.id === skill.id));

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full sm:max-w-3xl bg-gray-900 border-gray-700 text-foreground max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-white">
            Edit skills
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="relative">
            <h3 className="text-lg font-medium mb-4 text-gray-300">
              Search skills or add your own
            </h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-10 pl-10 bg-gray-800 border-gray-600 text-white"
                placeholder="Search skills or add your own"
              />
            </div>

            {searchTerm !== "" &&
              filteredSkills &&
              filteredSkills.length > 0 && (
                <div className="absolute z-10 w-full mt-1 max-h-56 overflow-auto rounded-md border border-gray-700 bg-background">
                  {filteredSkills.map((skill, index) => (
                    <button
                      key={index}
                      className="w-full text-left px-3 py-2 hover:bg-gray-800 focus:bg-gray-800 focus:outline-none"
                      onClick={() => handleAddSkill(skill.id)}
                    >
                      {skill.name}
                    </button>
                  ))}
                </div>
              )}
          </div>

          {skills.length > 0 && (
            <div>
              <h4 className="text-base font-medium mb-3">Selected skills</h4>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <div
                    key={skill.id}
                    className="bg-gray-800 border border-gray-600 rounded-full px-3 py-1 flex items-center gap-2"
                  >
                    <span className="text-sm">{skill.name}</span>
                    <button
                      onClick={() => handleRemoveSkill(skill.id)}
                      className="text-gray-400 hover:text-white"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <h4 className="text-base font-medium mb-3 text-gray-300">
              Popular skills for {jobTitle}
            </h4>
            <div className="flex flex-wrap gap-2">
              {popularSkills?.map((skill) => (
                <Button
                  key={skill.id}
                  variant="outline"
                  size="sm"
                  onClick={() => handleAddSkill(skill.id)}
                  className="bg-gray-800 border-gray-600 text-white hover:bg-gray-700 rounded-full"
                >
                  {skill.name}
                  <Plus className="w-3 h-3 ml-1" />
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-6">
          <Button
            variant="ghost"
            onClick={onClose}
            className="text-green-500 hover:text-green-400 hover:bg-green-500/10"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            // disabled={isLoading}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            {/* {isLoading ? "Saving..." : saveText} */}
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
