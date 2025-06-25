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
import { areaOfStudyList } from "./__mock__/areaOfStudy";
import { degrees } from "./__mock__/degree";

interface AddEducationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (education: EducationData) => void;
}

interface EducationData {
  school: string;
  startYear?: number;
  endYear?: number;
  degree?: string;
  areaOfStudy?: string;
  description?: string;
}

const years = Array.from({ length: 50 }, (_, i) =>
  (new Date().getFullYear() - i).toString()
);

export function AddEducationModal({
  open,
  onOpenChange,
}: AddEducationModalProps) {
  const { data: session } = useSession();

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [areaOfStudy, setAreaOfStudy] = useState("");
  const [showAreaOfStudyDropdown, setShowAreaOfStudyDropdown] = useState(false);

  const [educationForm, setEducationForm] = useState({
    school: "",
    startYear: 0,
    endYear: 0,
    degree: "",
    areaOfStudy: "",
    description: "",
  });

  const queryClient = useQueryClient();

  const handleSave = async () => {
    setStatus("loading");
    try {
      const response = await api.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/${session?.user?.id}/education/create`,
        [educationForm]
      );

      if (response.status !== 201) {
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

  const resetForm = () => {
    setEducationForm({
      school: "",
      startYear: 0,
      endYear: 0,
      degree: "",
      areaOfStudy: "",
      description: "",
    });
  };

  const handleAddAreaOfStudy = (value: string) => {
    setAreaOfStudy(value);
    setEducationForm((prev) => ({
      ...prev,
      areaOfStudy: value,
    }));
  };

  const handleCancel = () => {
    setStatus("idle");
    resetForm();
    onOpenChange(false);
  };

  const showDropdown = areaOfStudy && showAreaOfStudyDropdown;

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
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none"
              placeholder="Ex: Northwestern University"
            />
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

          <div className="relative space-y-2">
            <div className="flex flex-col gap-3">
              <label htmlFor="areaOfStudy" className="text-sm font-medium">
                Area of Study (Optional)
              </label>
              <input
                type="text"
                value={areaOfStudy}
                onChange={(e) => setAreaOfStudy(e.target.value)}
                onFocus={() => setShowAreaOfStudyDropdown(true)}
                onBlur={() =>
                  setTimeout(() => setShowAreaOfStudyDropdown(false), 200)
                }
                placeholder="Search area of study"
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none"
              />
            </div>
            {showDropdown && (
              <div className="absolute z-10 w-full mt-1 max-h-56 overflow-auto rounded-md border border-gray-700 bg-background p-1">
                {areaOfStudyList
                  .filter((item) =>
                    item.toLowerCase().includes(areaOfStudy.toLowerCase())
                  )
                  .map((value, index) => (
                    <button
                      key={index}
                      className="w-full text-left px-3 py-2 hover:bg-gray-800 focus:bg-gray-800 focus:outline-none rounded-md"
                      onClick={() => handleAddAreaOfStudy(value)}
                    >
                      {value}
                    </button>
                  ))}
              </div>
            )}
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
          <p className="text-green-500">Add education successfully.</p>
        )}
        {status === "error" && (
          <p className="text-red-500">Failed to add education.</p>
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
