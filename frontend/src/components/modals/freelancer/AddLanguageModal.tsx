"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface AddLanguageModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (language: string, proficiency: string) => void;
}

const languages = [
  "English",
  "Spanish",
  "French",
  "German",
  "Italian",
  "Portuguese",
  "Russian",
  "Chinese (Mandarin)",
  "Japanese",
  "Korean",
  "Arabic",
  "Hindi",
  "Dutch",
  "Swedish",
  "Norwegian",
];

const proficiencyLevels = [
  { value: "basic", label: "Basic" },
  { value: "conversational", label: "Conversational" },
  { value: "fluent", label: "Fluent" },
  { value: "native", label: "Native or Bilingual" },
];

export function AddLanguageModal({
  open,
  onOpenChange,
  onSave,
}: AddLanguageModalProps) {
  const [language, setLanguage] = useState("");
  const [proficiency, setProficiency] = useState("");

  const handleSave = () => {
    if (language && proficiency) {
      onSave(language, proficiency);
      setLanguage("");
      setProficiency("");
      onOpenChange(false);
    }
  };

  const handleCancel = () => {
    setLanguage("");
    setProficiency("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-card text-card-foreground">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <DialogTitle className="text-xl font-semibold">
            Add language
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
            <label htmlFor="language" className="text-sm font-medium">
              Language
            </label>
            <select
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
            >
              <option value="" disabled>
                Search for language
              </option>
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="proficiency" className="text-sm font-medium">
              Proficiency level
            </label>
            <select
              id="proficiency"
              value={proficiency}
              onChange={(e) => setProficiency(e.target.value)}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
            >
              <option value="" disabled>
                Search for proficiency level
              </option>
              {proficiencyLevels.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
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
            disabled={!language || !proficiency}
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
