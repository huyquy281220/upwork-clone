"use client";

import { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

// Sample skills data
const SKILLS_DATA = {
  "Web Application": [
    "Web Development",
    "Frontend",
    "Backend",
    "Full Stack",
    "React",
    "Angular",
    "Vue",
    "Node.js",
  ],
  Data: [
    "Data Lake",
    "Data Chart",
    "Data Cloud",
    "Data Entry",
    "Data Model",
    "Data Point",
    "Data Backup",
    "Data Center",
    "Data Mining",
    "Data Binding",
  ],
  AI: [
    "AI Bot",
    "AI Policy",
    "AI Builder",
    "AI Chatbot",
    "AI Trading",
    "AI Platform",
    "AI Security",
    "AI Classifier",
    "AI Compliance",
    "AI Consulting",
  ],
  Computer: [
    "Computer Science",
    "Computer Vision",
    "Computer Graphics",
    "Computer Architecture",
  ],
  Design: [
    "UI Design",
    "UX Design",
    "Graphic Design",
    "Web Design",
    "Mobile Design",
  ],
};

export interface SkillsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedSkills?: string[];
  onSave: (skills: string[]) => void;
}

export function SkillsModal({
  open,
  onOpenChange,
  selectedSkills = [],
  onSave,
}: SkillsModalProps) {
  const [skills, setSkills] = useState<string[]>(selectedSkills);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const MAX_SKILLS = 15;

  useEffect(() => {
    if (searchTerm) {
      const results: string[] = [];

      Object.entries(SKILLS_DATA).forEach(([category, categorySkills]) => {
        if (category.toLowerCase().includes(searchTerm.toLowerCase())) {
          results.push(...categorySkills);
        } else {
          const filteredSkills = categorySkills.filter((skill) =>
            skill.toLowerCase().includes(searchTerm.toLowerCase())
          );
          results.push(...filteredSkills);
        }
      });

      setSearchResults([...new Set(results)]);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const handleAddSkill = (skill: string) => {
    if (skills.length < MAX_SKILLS && !skills.includes(skill)) {
      setSkills([...skills, skill]);
      setSearchTerm("");
      inputRef.current?.focus();
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleSave = () => {
    onSave(skills);
    onOpenChange(false);
  };

  const handleCloseModal = () => {
    console.log(selectedSkills);
    setSkills(selectedSkills);
    setSearchTerm("");
    console.log("test");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-3xl bg-background text-foreground border-gray-800"
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

        <div className="space-y-4">
          <div>
            <h3 className="mb-2 text-lg font-medium">Skills</h3>

            <div className="relative">
              <div className="flex flex-wrap gap-2 p-2 min-h-10 rounded-md border border-gray-700 bg-transparent">
                {skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="bg-background text-foreground flex items-center gap-1 py-1.5 border border-gray-700"
                  >
                    {skill}
                    <button
                      onClick={() => handleRemoveSkill(skill)}
                      className="ml-1 rounded-full"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                <input
                  ref={inputRef}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search skills"
                  className="flex-1 min-w-[120px] h-8 bg-transparent border-0 focus-visible:bg-none p-0 pl-2"
                />
              </div>

              {searchResults.length > 0 && (
                <div className="absolute z-10 w-full mt-1 max-h-60 overflow-auto rounded-md border border-gray-700 bg-background">
                  {searchResults.map((skill) => (
                    <button
                      key={skill}
                      className="w-full text-left px-3 py-2 hover:bg-gray-800 focus:bg-gray-800 focus:outline-none"
                      onClick={() => handleAddSkill(skill)}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <p className="text-sm text-gray-400 mt-2">
              Maximum {MAX_SKILLS} skills.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
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
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
