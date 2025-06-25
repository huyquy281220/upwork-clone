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
import { useSession } from "next-auth/react";
import api from "@/services/api";
import { useQueryClient } from "@tanstack/react-query";

interface AddLanguageModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const proficiencyLevels = [
  { value: "BASIC", label: "Basic" },
  { value: "CONVERSATIONAL", label: "Conversational" },
  { value: "FLUENT", label: "Fluent" },
  { value: "NATIVE", label: "Native or Bilingual" },
];

export function AddLanguageModal({
  open,
  onOpenChange,
}: AddLanguageModalProps) {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const [language, setLanguage] = useState("");
  const [proficiency, setProficiency] = useState("");
  const [commandDialogOpen, setCommandDialogOpen] = useState(false);
  const [languages, setLanguages] = useState<string[]>([]);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  useEffect(() => {
    const fetchLanguages = async () => {
      const response = await getLanguagesWithoutDuplicates();
      setLanguages(response);
    };
    fetchLanguages();
  }, []);

  const handleSave = async () => {
    if (!language || !proficiency || !session?.user?.id) return;

    setStatus("loading");

    try {
      // Create new language object
      const newLanguage = {
        name: language,
        proficiency,
      };
      // Call API to update languages
      const response = await api.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/${session.user.id}/languages/create`,
        [newLanguage]
      );

      if (response.status !== 201) {
        setStatus("error");
      }
      setStatus("success");

      await queryClient.invalidateQueries({
        queryKey: ["user", session.user.id],
      });

      // Reset form state
      setLanguage("");
      setProficiency("");

      setTimeout(() => {
        onOpenChange(false);
      }, 1500);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    setLanguage("");
    setProficiency("");
    setStatus("idle");
    onOpenChange(false);
  };

  const handleSelectLanguage = (selectedLanguage: string) => {
    setLanguage(selectedLanguage);
    setCommandDialogOpen(false);

    setTimeout(() => {
      const mainDialog = document.querySelector('[data-dialog="main"]');
      if (mainDialog) {
        const firstFocusable = mainDialog.querySelector(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (firstFocusable) {
          (firstFocusable as HTMLElement).focus();
        }
      }
    }, 100);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          className="sm:max-w-[500px] bg-card text-card-foreground"
          showCloseButton={false}
          data-dialog="main"
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

          {status === "success" && (
            <p className="text-green-500">Add language successfully.</p>
          )}
          {status === "error" && (
            <p className="text-red-500">Failed to add language.</p>
          )}

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
              {status === "loading" ? "Saving ..." : "Save"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={commandDialogOpen} onOpenChange={setCommandDialogOpen}>
        <DialogContent
          data-dialog="language-selector"
          className="overflow-hidden p-0 shadow-lg"
          onCloseAutoFocus={(e) => {
            // Prevent auto focus when closing
            e.preventDefault();

            // Manual focus to main dialog
            setTimeout(() => {
              const mainDialog = document.querySelector('[data-dialog="main"]');
              const selectTrigger = mainDialog?.querySelector(
                '[data-focusable="true"]'
              );
              if (selectTrigger) {
                (selectTrigger as HTMLElement).focus();
              }
            }, 50);
          }}
        >
          <DialogHeader className="px-4 pb-4 pt-5">
            <DialogTitle>Select Language</DialogTitle>
          </DialogHeader>
          <Command>
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
