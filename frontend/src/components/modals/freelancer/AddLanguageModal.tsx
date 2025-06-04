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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
      <DialogContent
        className="sm:max-w-[600px] bg-card text-card-foreground"
        showCloseButton={false}
      >
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
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="bg-background border-border">
                <SelectValue placeholder="Search for language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang} value={lang}>
                    {lang}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="proficiency" className="text-sm font-medium">
              Proficiency level
            </label>
            <Select value={proficiency} onValueChange={setProficiency}>
              <SelectTrigger className="bg-background border-border">
                <SelectValue placeholder="Search for proficiency level" />
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
            disabled={!language || !proficiency}
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
