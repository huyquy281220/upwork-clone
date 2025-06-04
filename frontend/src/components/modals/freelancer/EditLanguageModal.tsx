"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";

interface EditLanguagesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentLanguage: string;
  currentProficiency: string;
  onSave: (language: string, proficiency: string) => void;
}

const proficiencyLevels = [
  { value: "basic", label: "Basic" },
  { value: "conversational", label: "Conversational" },
  { value: "fluent", label: "Fluent" },
  { value: "native", label: "Native or Bilingual" },
];

export function EditLanguagesModal({
  open,
  onOpenChange,
  currentLanguage,
  currentProficiency,
  onSave,
}: EditLanguagesModalProps) {
  const [language, setLanguage] = useState(currentLanguage);
  const [proficiency, setProficiency] = useState(currentProficiency);

  const handleSave = () => {
    onSave(language, proficiency);
    onOpenChange(false);
  };

  const handleCancel = () => {
    setLanguage(currentLanguage);
    setProficiency(currentProficiency);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-card text-card-foreground">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <DialogTitle className="text-xl font-semibold">
            Edit languages
          </DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onOpenChange(false)}
            className="h-6 w-6 rounded-full"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <p>Language</p>
            <input
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-background border-border"
              placeholder="Enter language"
            />
          </div>

          <div className="space-y-2">
            <p>Proficiency level</p>
            <Select value={proficiency} onValueChange={setProficiency}>
              <SelectTrigger className="bg-background border-border">
                <SelectValue placeholder="Select proficiency" />
              </SelectTrigger>
              <SelectContent>
                {proficiencyLevels.map((level) => (
                  <SelectItem key={level.value} value={level.value}>
                    {level.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-6">
          <Button
            variant="ghost"
            onClick={handleCancel}
            className="text-green-600"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-green-600 hover:bg-green-700"
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
