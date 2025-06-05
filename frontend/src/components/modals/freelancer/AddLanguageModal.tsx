"use client";

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
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { getLanguages } from "@/utils/getLanguages";

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
  const [languageOpen, setLanguageOpen] = useState(false);
  const [languages, setLanguages] = useState<string[]>([]);

  useEffect(() => {
    const fetchLanguages = async () => {
      const langs = await getLanguages();
      setLanguages(langs);
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
  console.log(languageOpen);
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
            <Popover open={languageOpen} onOpenChange={setLanguageOpen} modal>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={languageOpen}
                  className="w-full justify-between bg-background border-border"
                >
                  {language || "Search for language"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0" align="start">
                <Command>
                  <CommandInput
                    placeholder="Search language..."
                    className="h-9"
                    autoFocus
                  />
                  <CommandList>
                    <CommandEmpty>No language found.</CommandEmpty>
                    <CommandGroup>
                      {languages.map((lang) => (
                        <CommandItem
                          key={lang}
                          value={lang}
                          onSelect={(currentValue) => {
                            setLanguage(currentValue);
                            setLanguageOpen(false);
                          }}
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
              </PopoverContent>
            </Popover>
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
