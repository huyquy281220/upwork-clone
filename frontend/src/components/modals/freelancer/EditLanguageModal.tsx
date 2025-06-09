"use client";

import { Dispatch, SetStateAction, useState } from "react";
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
import { useSession } from "next-auth/react";
import { useUserLanguages } from "@/hooks/useUserInfo";
import api from "@/services/api";
import { LanguageData } from "@/types/modals";

interface EditLanguagesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: Dispatch<SetStateAction<LanguageData[]>>;
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
  onSave,
}: EditLanguagesModalProps) {
  const { data: session } = useSession();
  const { data: languages } = useUserLanguages(session?.user?.id ?? "");

  console.log(languages);

  const [proficiencyChanges, setProficiencyChanges] = useState<
    Record<string, string>
  >({});

  console.log(proficiencyChanges);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    if (!languages) return;

    setIsLoading(true);
    setError(null);

    try {
      // Create new language object
      const updatedLanguages = languages.map((lang) => ({
        name: lang.language,
        level: proficiencyChanges[lang.id!] || lang.proficiency,
      }));

      const response = await api.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/${session?.user?.id}/languages`,
        {
          languages: updatedLanguages,
        }
      );

      if (response.status !== 200) {
        const errorData = response.data;
        throw new Error(errorData.message || "Failed to update languages");
      }

      // Reset changes
      setProficiencyChanges({});

      // Close modal and call success callback
      onOpenChange(false);
    } catch (error) {
      console.error("Error updating languages:", error);
      setError(
        error instanceof Error ? error.message : "Failed to update languages"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-[500px] bg-card text-card-foreground"
        showCloseButton={false}
      >
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

        {languages && languages.length > 0 ? (
          languages?.map(({ language, proficiency, id }) => (
            <div className="grid grid-cols-2 gap-4" key={id}>
              <div className="space-y-2">
                <p>Language</p>
                <input
                  id="language"
                  value={language}
                  className="bg-background w-[217px] h-[38px] rounded-md cursor-not-allowed"
                  // placeholder="Enter language"
                  disabled
                />
              </div>

              <div className="space-y-2">
                <p>Proficiency level</p>
                <Select
                  value={proficiency}
                  onValueChange={(value) =>
                    setProficiencyChanges({
                      ...proficiencyChanges,
                      [id!]: value,
                    })
                  }
                >
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue
                      // placeholder="Select proficiency"
                      defaultValue={proficiency}
                    />
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
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-sm text-muted-foreground">No languages found</p>
          </div>
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
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
