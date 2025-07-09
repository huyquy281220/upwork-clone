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
import { useQueryClient } from "@tanstack/react-query";
import api from "@/services/api";
import { useSession } from "next-auth/react";

import { useCountries } from "@/hooks/useCountries";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

interface EditCountryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentCountry: string;
  userId: string;
}

export function EditCountryModal({
  open,
  onOpenChange,
  currentCountry,
  userId,
}: EditCountryModalProps) {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const [country, setCountry] = useState(currentCountry);
  const [commandDialogOpen, setCommandDialogOpen] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const countries = useCountries();

  const handleSave = async () => {
    if (!country) return;

    setStatus("loading");

    try {
      const response = await api.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/update`,
        { id: userId, address: country }
      );

      if (response.status !== 200) {
        setStatus("error");
      }

      setStatus("success");

      await queryClient.invalidateQueries({
        queryKey: ["user", session?.user.id],
      });

      setTimeout(() => {
        onOpenChange(false);
      }, 1500);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    setStatus("idle");
    setCountry(currentCountry);
    onOpenChange(false);
  };

  const handleSelectCountry = (selectedCountry: string) => {
    setCountry(selectedCountry);
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
    <div>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          className="sm:max-w-[500px] bg-card text-card-foreground"
          showCloseButton={false}
        >
          <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <DialogTitle className="text-xl font-semibold">
              Edit your country
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

          <div className="space-y-2">
            <label htmlFor="country" className="text-sm font-medium">
              Country
            </label>
            <Button
              variant="outline"
              role="combobox"
              className="w-full justify-between bg-background border-border hover:bg-background"
              onClick={() => setCommandDialogOpen(true)}
            >
              {country || "Search for country"}
            </Button>
          </div>

          {status === "success" && (
            <p className="text-green-500">Add country successfully.</p>
          )}
          {status === "error" && (
            <p className="text-red-500">Failed to add country.</p>
          )}
          <div className="flex justify-end gap-3 pt-4">
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
              {status === "loading" ? "Saving..." : "Save"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={commandDialogOpen} onOpenChange={setCommandDialogOpen}>
        <DialogContent
          data-dialog="country-selector"
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
            <DialogTitle>Select country</DialogTitle>
          </DialogHeader>
          <Command>
            <CommandInput placeholder="Search country..." />
            <CommandList className="max-h-[300px] overflow-y-auto">
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup heading="countries">
                {countries?.map(({ name }) => (
                  <CommandItem
                    key={name.common}
                    value={name.common}
                    onSelect={() => handleSelectCountry(name.common)}
                  >
                    {name.common}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
    </div>
  );
}
