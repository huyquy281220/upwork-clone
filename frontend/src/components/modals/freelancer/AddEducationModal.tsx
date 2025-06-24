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
import { useSession } from "next-auth/react";
import api from "@/services/api";
import { useQueryClient } from "@tanstack/react-query";

interface AddEducationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (education: EducationData) => void;
}

interface EducationData {
  school: string;
  fromYear?: number;
  toYear?: number;
  degree?: string;
  areaOfStudy?: string;
  description?: string;
}

const years = Array.from({ length: 50 }, (_, i) =>
  (new Date().getFullYear() - i).toString()
);

const degrees = [
  "Associate's Degree",
  "Bachelor's Degree",
  "Master's Degree",
  "Doctoral Degree",
  "Professional Degree",
  "Certificate",
  "Diploma",
  "High School Diploma",
];

export function AddEducationModal({
  open,
  onOpenChange,
}: AddEducationModalProps) {
  const { data: session } = useSession();

  const [educationForm, setEducationForm] = useState({
    school: "",
    fromYear: 0,
    toYear: 0,
    degree: "",
    areaOfStudy: "",
    description: "",
  });

  const queryClient = useQueryClient();

  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    try {
      const response = await api.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/${session?.user?.id}/education/create`,
        [educationForm]
      );

      if (response.status !== 201) {
        throw new Error("Failed to add education");
      }

      await queryClient.invalidateQueries({
        queryKey: ["user", session?.user?.id],
      });

      onOpenChange(false);
    } catch (error) {
      console.error("Error adding education:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setEducationForm({
      school: "",
      fromYear: 0,
      toYear: 0,
      degree: "",
      areaOfStudy: "",
      description: "",
    });
  };

  const handleCancel = () => {
    resetForm();
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
            Add education
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

        <div className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="school" className="text-sm font-medium">
              School
            </label>
            <input
              id="school"
              type="text"
              value={educationForm.school}
              onChange={(e) =>
                setEducationForm({
                  ...educationForm,
                  school: e.target.value,
                })
              }
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Ex: Northwestern University"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Dates Attended (Optional)
            </label>
            <div className="grid grid-cols-2 gap-4">
              <Select
                value={educationForm.fromYear.toString()}
                onValueChange={(value) =>
                  setEducationForm({ ...educationForm, fromYear: +value })
                }
              >
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="From" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={educationForm.toYear.toString()}
                onValueChange={(value) =>
                  setEducationForm({ ...educationForm, toYear: +value })
                }
              >
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="To (or expected graduation year)" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="degree" className="text-sm font-medium">
              Degree (Optional)
            </label>
            <Select
              value={educationForm.degree}
              onValueChange={(value) =>
                setEducationForm({ ...educationForm, degree: value })
              }
            >
              <SelectTrigger className="bg-background border-border">
                <SelectValue placeholder="Degree (Optional)" />
              </SelectTrigger>
              <SelectContent>
                {degrees.map((deg) => (
                  <SelectItem key={deg} value={deg}>
                    {deg}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="areaOfStudy" className="text-sm font-medium">
              Area of Study (Optional)
            </label>
            <input
              id="areaOfStudy"
              type="text"
              value={educationForm.areaOfStudy}
              onChange={(e) =>
                setEducationForm({
                  ...educationForm,
                  areaOfStudy: e.target.value,
                })
              }
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Ex: Computer Science"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description (Optional)
            </label>
            <textarea
              id="description"
              value={educationForm.description}
              onChange={(e) =>
                setEducationForm({
                  ...educationForm,
                  description: e.target.value,
                })
              }
              className="w-full min-h-[100px] rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 resize-none"
              placeholder="Describe your education, achievements, or relevant coursework..."
            />
          </div>
        </div>

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
            disabled={!educationForm.school}
          >
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
