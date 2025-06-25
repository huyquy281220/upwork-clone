"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { SelectValue } from "@/components/ui/select";
import { SelectItem, SelectTrigger } from "@/components/ui/select";
import { SelectContent } from "@/components/ui/select";
import { Select } from "@/components/ui/select";
import { useSession } from "next-auth/react";
import { useUserEducation } from "@/hooks/useUserInfo";
import api from "@/services/api";
import { useQueryClient } from "@tanstack/react-query";
import { degrees } from "./__mock__/degree";

interface EditEducationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  educationId: string;
}

const years = Array.from({ length: 50 }, (_, i) =>
  (new Date().getFullYear() - i).toString()
);

export function EditEducationModal({
  open,
  onOpenChange,
  educationId,
}: EditEducationModalProps) {
  const { data: session } = useSession();
  const { data: educations } = useUserEducation(session?.user?.id ?? "");

  const [educationForm, setEducationForm] = useState({
    id: "",
    school: "",
    startYear: 0,
    endYear: 0,
    degree: "",
    areaOfStudy: "",
    description: "",
  });

  const queryClient = useQueryClient();

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const education = educations?.find((e) => e.id === educationId);

  useEffect(() => {
    if (education) {
      setEducationForm({
        id: education.id ?? "",
        school: education.school || "",
        startYear: education.startYear || 0,
        endYear: education.endYear || 0,
        degree: education.degree || "",
        areaOfStudy: education.areaOfStudy || "",
        description: education.description || "",
      });
    }
  }, [education]);

  const handleSave = async () => {
    setStatus("loading");
    try {
      const response = await api.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/${session?.user?.id}/education/update`,
        [educationForm]
      );

      if (response.status !== 200) {
        setStatus("error");
      }

      setStatus("success");

      await queryClient.invalidateQueries({
        queryKey: ["user", session?.user?.id],
      });

      setTimeout(() => {
        onOpenChange(false);
      }, 1500);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    if (education) {
      setEducationForm({
        id: education.id ?? "",
        school: education.school || "",
        startYear: education.startYear || 0,
        endYear: education.endYear || 0,
        degree: education.degree || "",
        areaOfStudy: education.areaOfStudy || "",
        description: education.description || "",
      });
    }
    setStatus("idle");
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
            Edit education {educationId}
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
            <div className="relative">
              <input
                id="school"
                type="text"
                value={educationForm.school}
                onChange={(e) =>
                  setEducationForm({ ...educationForm, school: e.target.value })
                }
                className="w-full rounded-md border border-border bg-background px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                placeholder="Ex: Northwestern University"
              />
              {educationForm.school && (
                <button
                  type="button"
                  onClick={() =>
                    setEducationForm({ ...educationForm, school: "" })
                  }
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-5 w-5 rounded-full flex items-center justify-center hover:bg-muted"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Dates Attended (Optional)
            </label>
            <div className="grid grid-cols-2 gap-4">
              <Select
                value={educationForm.startYear.toString()}
                onValueChange={(value) =>
                  setEducationForm({ ...educationForm, startYear: +value })
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
                value={educationForm.endYear.toString()}
                onValueChange={(value) =>
                  setEducationForm({ ...educationForm, endYear: +value })
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
            <div className="relative">
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
                className="w-full rounded-md border border-border bg-background px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                placeholder="Ex: Computer Science"
              />
              {educationForm.areaOfStudy && (
                <button
                  type="button"
                  onClick={() =>
                    setEducationForm({ ...educationForm, areaOfStudy: "" })
                  }
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-5 w-5 rounded-full flex items-center justify-center hover:bg-muted"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
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

        {status === "success" && (
          <p className="text-green-500">Edit education successfully.</p>
        )}
        {status === "error" && (
          <p className="text-red-500">Failed to edit education.</p>
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
            disabled={!educationForm.school}
          >
            {status === "loading" ? "Saving..." : "Save"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
