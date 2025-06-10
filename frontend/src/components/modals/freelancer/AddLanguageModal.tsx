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
import { Check, ChevronsUpDown, Loader2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { getLanguagesWithoutDuplicates } from "@/utils/getLanguages";
import { useUser } from "@/hooks/useUserInfo";
import { FreelancerUser } from "@/types/user";
import { useSession } from "next-auth/react";
import api from "@/services/api";

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
  const { data: user } = useUser<FreelancerUser>(session?.user?.id ?? "");

  const [language, setLanguage] = useState("");
  const [proficiency, setProficiency] = useState("");
  const [commandDialogOpen, setCommandDialogOpen] = useState(false);
  const [languages, setLanguages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLanguages = async () => {
      const response = await getLanguagesWithoutDuplicates();
      setLanguages(response);
    };
    fetchLanguages();
  }, []);

  const handleSave = async () => {
    if (!language || !proficiency || !session?.user?.id) return;

    setIsLoading(true);
    setError(null);

    try {
      // Create new language object
      const newLanguage = {
        name: language,
        proficiency,
      };

      // Get current user languages and add the new one
      const currentLanguages = user?.freelancerProfile?.languages || [];
      const updatedLanguages = [...currentLanguages, newLanguage];

      // Call API to update languages
      const response = await api.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/${session.user.id}/languages`,
        {
          languages: updatedLanguages,
        }
      );

      if (response.status !== 200) {
        const errorData = response.data;
        throw new Error(errorData.message || "Failed to add language");
      }

      // Reset form state
      setLanguage("");
      setProficiency("");

      // Close modal and call success callback
      onOpenChange(false);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to add language"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setLanguage("");
    setProficiency("");
    setError(null);
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

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

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
              disabled={!language || !proficiency || isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save"
              )}
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
