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
import { Plus, Clock, Trash2, Calendar } from "lucide-react";
import { WorkLogProps, CreateWorkLogProps } from "@/types/work-log";
import { formatTimeRangeVN, formatToISODate } from "@/utils/formatDate";

interface TimeEntriesListProps {
  timeEntries: WorkLogProps[];
  hourlyRate: number;
  onAddTimeEntry: (entry: CreateWorkLogProps) => void;
  onEditTimeEntry: (id: string, entry: Partial<WorkLogProps>) => void;
  onDeleteTimeEntry: (id: string) => void;
}

export function TimeEntriesList({
  timeEntries,
  hourlyRate,
  onAddTimeEntry,
  onEditTimeEntry,
  onDeleteTimeEntry,
}: TimeEntriesListProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<WorkLogProps | null>(null);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    startTime: "00:00",
    endTime: "12:00",
    description: "",
    hourlyRate,
  });

  // const formatDuration = (seconds: number) => {
  //   const hours = Math.floor(seconds / 3600);
  //   const minutes = Math.floor((seconds % 3600) / 60);
  //   return `${hours}h ${minutes}m`;
  // };

  const calculateDuration = (startTime: string, endTime: string) => {
    const start = new Date(`2000-01-01T${startTime}:00`);
    const end = new Date(`2000-01-01T${endTime}:00`);

    return Math.max(0, (end.getTime() - start.getTime()) / 3600000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const duration = calculateDuration(formData.startTime, formData.endTime);

    const entryData = {
      loggedAt: formatToISODate(formData.startTime),
      endTime: formatToISODate(formData.endTime),
      description: formData.description,
      hours: duration,
    };

    if (editingEntry) {
      onEditTimeEntry(editingEntry.id, entryData);
      setEditingEntry(null);
    } else {
      onAddTimeEntry(entryData);
      setTimeout(() => {
        setIsAddDialogOpen(false);
      }, 1800);
    }

    setFormData({
      date: new Date().toISOString().split("T")[0],
      startTime: "00:00",
      endTime: "12:00",
      description: "",
      hourlyRate,
    });
  };

  // const handleEdit = (entry: Partial<WorkLogProps>) => {
  //   setEditingEntry(entry);
  //   setFormData((prev) => ({
  //     ...prev,
  //     startTime: entry.,
  //     endTime: entry.endTime,
  //     description: entry.description,
  //   }));
  // };

  // const getStatusColor = (status: string) => {
  //   switch (status) {
  //     case "approved":
  //       return "default";
  //     case "submitted":
  //       return "secondary";
  //     default:
  //       return "outline";
  //   }
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
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="hourlyRate">Hourly Rate</Label>
                  <Input
                    id="hourlyRate"
                    type="number"
                    value={formData.hourlyRate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        hourlyRate: Number(e.target.value),
                      })
                    }
                    disabled
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startTime">Start Time</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={formData.startTime}
                    onChange={(e) =>
                      setFormData({ ...formData, startTime: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="endTime">End Time</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={formData.endTime}
                    onChange={(e) =>
                      setFormData({ ...formData, endTime: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Describe what you worked on..."
                  required
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="text-white">
                  Add Entry
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
                        <Calendar className="w-4 h-4" />
                        {/* {entry.date} */}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-foreground">
                        <Clock className="w-4 h-4" />
                        {formatTimeRangeVN(entry.loggedAt, entry.endTime)}
                      </div>
                      {/* <Badge variant={getStatusColor(entry.status)}>
                        {entry.status}
                      </Badge> */}
                    </div>

                    <p className="text-foreground mb-3">{entry.description}</p>

                    <div className="flex items-center gap-6 text-sm text-foreground">
                      <span>Duration: {entry.hours} hours</span>
                      <span>Rate: ${hourlyRate}/hour</span>
                      <span className="font-medium text-green-600">
                        {/* Earnings: ${entry.earnings.toFixed(2)} */}
                      </span>
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
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-date">Date</Label>
                <Input
                  id="edit-date"
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="edit-hourlyRate">Hourly Rate</Label>
                <Input
                  id="edit-hourlyRate"
                  type="number"
                  value={formData.hourlyRate}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      hourlyRate: Number(e.target.value),
                    })
                  }
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-startTime">Start Time</Label>
                <Input
                  id="edit-startTime"
                  type="time"
                  value={formData.startTime}
                  onChange={(e) =>
                    setFormData({ ...formData, startTime: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="edit-endTime">End Time</Label>
                <Input
                  id="edit-endTime"
                  type="time"
                  value={formData.endTime}
                  onChange={(e) =>
                    setFormData({ ...formData, endTime: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Describe what you worked on..."
                required
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditingEntry(null)}
              >
                Cancel
              </Button>
              <Button type="submit" className="text-white">
                Update Entry
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
