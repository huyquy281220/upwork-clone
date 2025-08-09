"use client";

import type React from "react";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Clock, Trash2 } from "lucide-react";
import { WorkLogProps, CreateWorkLogProps } from "@/types/work-log";
import { formatTimeRange } from "@/utils/formatDate";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface TimeEntriesListProps {
  timeEntries: WorkLogProps[];
  hourlyRate: number;
  onAddTimeEntry: (entry: CreateWorkLogProps) => void;
  onEditTimeEntry: (id: string, entry: Partial<WorkLogProps>) => void;
  onDeleteTimeEntry: (id: string) => void;
}

// Define the form schema
const timeEntrySchema = z.object({
  date: z.string().min(1, "Date is required"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  description: z.string().min(1, "Description is required"),
  hourlyRate: z.number().min(0, "Hourly rate must be positive"),
});

type TimeEntryFormData = z.infer<typeof timeEntrySchema>;

export function TimeEntriesList({
  timeEntries,
  hourlyRate,
  onAddTimeEntry,
  onEditTimeEntry,
  onDeleteTimeEntry,
}: TimeEntriesListProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<WorkLogProps | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    // setValue,
  } = useForm<TimeEntryFormData>({
    resolver: zodResolver(timeEntrySchema),
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
      startTime: "00:00",
      endTime: "12:00",
      description: "",
      hourlyRate: hourlyRate,
    },
  });

  const calculateDuration = (startTime: string, endTime: string) => {
    const start = new Date(`2000-01-01T${startTime}:00`);
    const end = new Date(`2000-01-01T${endTime}:00`);
    return Math.max(0, (end.getTime() - start.getTime()) / 3600000);
  };

  const onSubmit = (data: TimeEntryFormData) => {
    const duration = calculateDuration(data.startTime, data.endTime);

    const entryData = {
      loggedAt: data.startTime,
      endTime: data.endTime,
      description: data.description,
      hours: duration,
    };

    if (editingEntry) {
      onEditTimeEntry(editingEntry.id, entryData);
      setEditingEntry(null);
    } else {
      onAddTimeEntry(entryData);
      setTimeout(() => {
        setIsAddDialogOpen(false);
      }, 1500);
    }

    // Reset form
    reset({
      date: new Date().toISOString().split("T")[0],
      startTime: "00:00",
      endTime: "12:00",
      description: "",
      hourlyRate: hourlyRate,
    });
  };

  // Update form when editing
  // const handleEdit = (entry: WorkLogProps) => {
  //   setEditingEntry(entry);
  //   setValue("date", entry.loggedAt || new Date().toISOString().split("T")[0]);
  //   setValue("startTime", entry.loggedAt || "00:00");
  //   setValue("endTime", entry.endTime || "12:00");
  //   setValue("description", entry.description || "");
  //   setValue("hourlyRate", hourlyRate);
  // };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">
            Time Entries
          </h2>
          <p className="text-sm text-foreground opacity-75">
            Track your work hours and earnings
          </p>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2 text-white">
              <Plus className="w-4 h-4" />
              Add Time Entry
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Time Entry</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" type="date" {...register("date")} required />
                  {errors.date && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.date.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="hourlyRate">Hourly Rate</Label>
                  <Input
                    id="hourlyRate"
                    type="number"
                    {...register("hourlyRate", { valueAsNumber: true })}
                    disabled
                  />
                  {errors.hourlyRate && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.hourlyRate.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startTime">Start Time</Label>
                  <Input
                    id="startTime"
                    type="time"
                    {...register("startTime")}
                    required
                  />
                  {errors.startTime && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.startTime.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="endTime">End Time</Label>
                  <Input
                    id="endTime"
                    type="time"
                    {...register("endTime")}
                    required
                  />
                  {errors.endTime && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.endTime.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  {...register("description")}
                  placeholder="Describe what you worked on..."
                  required
                />
                {errors.description && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsAddDialogOpen(false);
                    reset();
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Adding..." : "Add Entry"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Time Entries List */}
      <div className="space-y-4">
        {timeEntries.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                No time entries yet
              </h3>
              <p className="text-gray-500 mb-4">
                Start tracking your work hours to monitor your progress
              </p>
            </CardContent>
          </Card>
        ) : (
          timeEntries.map((entry) => (
            <Card key={entry.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex items-center gap-2 text-sm text-foreground">
                        <Clock className="w-4 h-4" />
                        {formatTimeRange(entry.loggedAt, entry.endTime)}
                      </div>
                    </div>

                    <p className="text-foreground mb-3">{entry.description}</p>

                    <div className="flex items-center gap-6 text-sm text-foreground">
                      <span>Duration: {entry.hours} hours</span>
                      <span>Rate: ${hourlyRate}/hour</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(entry)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button> */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDeleteTimeEntry(entry.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Edit Dialog */}
      <Dialog open={!!editingEntry} onOpenChange={() => setEditingEntry(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Time Entry</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-date">Date</Label>
                <Input
                  id="edit-date"
                  type="date"
                  {...register("date")}
                  required
                />
                {errors.date && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.date.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="edit-hourlyRate">Hourly Rate</Label>
                <Input
                  id="edit-hourlyRate"
                  type="number"
                  {...register("hourlyRate", { valueAsNumber: true })}
                  required
                />
                {errors.hourlyRate && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.hourlyRate.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-startTime">Start Time</Label>
                <Input
                  id="edit-startTime"
                  type="time"
                  {...register("startTime")}
                  required
                />
                {errors.startTime && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.startTime.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="edit-endTime">End Time</Label>
                <Input
                  id="edit-endTime"
                  type="time"
                  {...register("endTime")}
                  required
                />
                {errors.endTime && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.endTime.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                {...register("description")}
                placeholder="Describe what you worked on..."
                required
              />
              {errors.description && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setEditingEntry(null);
                  reset();
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Updating..." : "Update Entry"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
