"use client";

import { Command } from "@/components/ui/command";

import { useEffect, useState } from "react";
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
import {
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { getLanguagesWithoutDuplicates } from "@/utils/getLanguages";

interface AddLanguageModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (language: string, proficiency: string) => void;
}

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
  const [commandDialogOpen, setCommandDialogOpen] = useState(false);
  const [languages, setLanguages] = useState<string[]>([]);

  useEffect(() => {
    const fetchLanguages = async () => {
      const response = await getLanguagesWithoutDuplicates();
      setLanguages(response);
    };
    fetchLanguages();
  }, []);

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

  const handleSelectLanguage = (selectedLanguage: string) => {
    setLanguage(selectedLanguage);
    setCommandDialogOpen(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          className="sm:max-w-[500px] bg-card text-card-foreground"
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
              <Button
                variant="outline"
                role="combobox"
                className="w-full justify-between bg-background border-border hover:bg-background"
                onClick={() => setCommandDialogOpen(true)}
              >
                {language || "Search for language"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
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

      <Dialog open={commandDialogOpen} onOpenChange={setCommandDialogOpen}>
        <DialogContent className="overflow-hidden p-0 shadow-lg">
          <DialogHeader className="px-4 pb-4 pt-5">
            <DialogTitle>Select Language</DialogTitle>
          </DialogHeader>
          <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
            <CommandInput placeholder="Search language..." />
            <CommandList className="max-h-[300px] overflow-y-auto">
              <CommandEmpty>No language found.</CommandEmpty>
              <CommandGroup heading="Languages">
                {languages.map((lang) => (
                  <CommandItem
                    key={lang}
                    value={lang}
                    onSelect={() => handleSelectLanguage(lang)}
                  >
                    {lang}
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        language === lang ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  );
}
