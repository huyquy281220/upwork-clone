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
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllSkills, getUserSkills } from "@/services/skills";
import { Skill } from "@/types";
import { UserSkill } from "@/types/user";
import { useSession } from "next-auth/react";
import api from "@/services/api";
export interface SkillsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SkillsModal({ open, onOpenChange }: SkillsModalProps) {
  const { data: session } = useSession();
  const { data: skills } = useQuery<Skill[]>({
    queryKey: ["skills"],
    queryFn: () => getAllSkills(),
  });

  const { data: userSkills } = useQuery<UserSkill[]>({
    queryKey: ["user-skills"],
    queryFn: () => getUserSkills(session?.user.id ?? ""),
  });

  const queryClient = useQueryClient();

  const skills2 = userSkills?.map((skill) => skill.skill.name);

  const [skillSelected, setSkillSelected] = useState<string[]>(skills2 ?? []);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const MAX_SKILLS = 15;

  useEffect(() => {
    if (searchTerm) {
      const results =
        skills
          ?.filter((skill) =>
            skill.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((skill) => skill.name) ?? [];

      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm, skills]);

  const handleAddSkill = (skill: string) => {
    if (skillSelected.length < MAX_SKILLS && !skillSelected.includes(skill)) {
      setSkillSelected([...skillSelected, skill]);
      setSearchTerm("");
      inputRef.current?.focus();
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setSkillSelected(skillSelected.filter((s) => s !== skill));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const newSkills = skills
        ?.filter((skill) => skillSelected.includes(skill.name))
        .map((skill) => skill.id);

      const response = await api.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user-skills/${session?.user.id}/create`,
        newSkills
      );

      if (response.status !== 201) {
        throw new Error("Failed to save skills");
      }

      await queryClient.invalidateQueries({
        queryKey: ["user-skills", session?.user.id],
      });

      onOpenChange(false);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setSearchTerm("");
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
                {skillSelected.map((skill, index) => (
                  <Badge
                    key={index}
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
                  {searchResults.map((skill, index) => (
                    <button
                      key={index}
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
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
