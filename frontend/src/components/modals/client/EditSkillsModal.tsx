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

interface EditSkillsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSkills: string[];
  onSave: (skills: string[]) => void;
}

const popularSkills = [
  "Mobile App Testing",
  "Automated Testing",
  "Functional Testing",
  "Web Testing",
  "Usability Testing",
  "JUnit",
  "Manual Testing",
  "Bug Reports",
  "Software Testing",
  "Test Automation Framework",
  "Black Box Testing",
  "Jira",
  "Performance Testing",
  "Product Stability",
  "Quality Assurance",
  "QA Engineering",
  "Regression Test Script",
  "Selenium",
  "Task Creation",
  "Test Case Design",
];

export function EditSkillsModal({
  isOpen,
  onClose,
  currentSkills,
  onSave,
}: EditSkillsModalProps) {
  const [skills, setSkills] = useState<string[]>(currentSkills);
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddSkill = (skill: string) => {
    if (!skills.includes(skill)) {
      setSkills([...skills, skill]);
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleSave = () => {
    onSave(skills);
    onClose();
  };

  const filteredSkills = popularSkills.filter(
    (skill) =>
      !skills.includes(skill) &&
      skill.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-gray-700 text-foreground max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Edit skills
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">
              Search skills or add your own
            </h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-800 border-gray-600 text-foreground pl-10"
                placeholder="Search skills or add your own"
              />
            </div>
          </div>

          {skills.length > 0 && (
            <div>
              <h4 className="text-base font-medium mb-3">Selected skills</h4>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <div
                    key={skill}
                    className="bg-gray-800 border border-gray-600 rounded-full px-3 py-1 flex items-center gap-2"
                  >
                    <span className="text-sm">{skill}</span>
                    <button
                      onClick={() => handleRemoveSkill(skill)}
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
            <h4 className="text-base font-medium mb-3">
              Popular skills for Manual Testing
            </h4>
            <div className="flex flex-wrap gap-2">
              {filteredSkills.map((skill) => (
                <Button
                  key={skill}
                  variant="outline"
                  size="sm"
                  onClick={() => handleAddSkill(skill)}
                  className="bg-gray-800 border-gray-600 text-foreground hover:bg-gray-700 rounded-full"
                >
                  {skill}
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
