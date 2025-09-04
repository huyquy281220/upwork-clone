"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";
import { CreateMilestoneProps } from "@/types/contract";
import { JobType } from "@/types/jobs";

interface MilestonesSectionProps {
  milestones: CreateMilestoneProps[];
  setMilestones: (milestones: CreateMilestoneProps[]) => void;
  contractType: string;
}

export function MilestonesSection({
  milestones,
  setMilestones,
  contractType,
}: MilestonesSectionProps) {
  const addMilestone = () => {
    const newMilestone: CreateMilestoneProps = {
      title: "",
      description: "",
      amount: 0,
      dueDate: "",
      file: new File([], ""),
    };
    setMilestones([...milestones, newMilestone]);
  };

  const removeMilestone = (title: string) => {
    setMilestones(milestones.filter((m) => m.title !== title));
  };

  const updateMilestone = (
    title: string,
    field: keyof CreateMilestoneProps,
    value: string
  ) => {
    setMilestones(
      milestones.map((m) =>
        m.title === title
          ? {
              ...m,
              [field]: field === "amount" ? Number(value) || 0 : value,
            }
          : m
      )
    );
  };

  const totalAmount = milestones.reduce(
    (sum, milestone) => sum + (Number(milestone.amount) || 0),
    0
  );

  if (contractType !== JobType.FIXED_PRICE) return null;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Milestones (Optional)</CardTitle>
          <Button variant="outline" size="sm" onClick={addMilestone}>
            <Plus className="w-4 h-4 mr-2" />
            Add Milestone
          </Button>
        </div>
        <p className="text-sm text-foreground opacity-80">
          Break down the project into smaller deliverables with payments.
        </p>
      </CardHeader>
      <CardContent>
        {milestones.length === 0 ? (
          <div className="text-center py-8 text-foreground opacity-80">
            <p className="mb-4">No milestones added yet.</p>
            <Button variant="outline" onClick={addMilestone}>
              <Plus className="w-4 h-4 mr-2" />
              Add First Milestone
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {milestones.map((milestone, index) => (
              <div key={milestone.title} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium">Milestone {index + 1}</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeMilestone(milestone.title)}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`milestone-name-${milestone.title}`}>
                      Milestone Name
                    </Label>
                    <Input
                      id={`milestone-name-${milestone.title}`}
                      value={milestone.title}
                      onChange={(e) =>
                        updateMilestone(
                          milestone.title,
                          "title",
                          e.target.value
                        )
                      }
                      placeholder="e.g., Initial Design Mockups"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`milestone-amount-${milestone.title}`}>
                      Amount
                    </Label>
                    <div className="relative mt-1">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground opacity-80">
                        $
                      </span>
                      <Input
                        id={`milestone-amount-${milestone.title}`}
                        type="number"
                        value={milestone.amount}
                        onChange={(e) =>
                          updateMilestone(
                            milestone.title,
                            "amount",
                            e.target.value
                          )
                        }
                        placeholder="0.00"
                        className="pl-8"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor={`milestone-due-${milestone.title}`}>
                      Due Date
                    </Label>
                    <Input
                      id={`milestone-due-${milestone.title}`}
                      type="date"
                      value={milestone.dueDate}
                      onChange={(e) =>
                        updateMilestone(
                          milestone.title,
                          "dueDate",
                          e.target.value
                        )
                      }
                      className="mt-1"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor={`milestone-description-${milestone.title}`}>
                      Description
                    </Label>
                    <Textarea
                      id={`milestone-description-${milestone.title}`}
                      value={milestone.description}
                      onChange={(e) =>
                        updateMilestone(
                          milestone.title,
                          "description",
                          e.target.value
                        )
                      }
                      placeholder="Describe what will be delivered in this milestone..."
                      className="mt-1 min-h-[80px]"
                    />
                  </div>
                </div>
              </div>
            ))}

            {milestones.length > 0 && (
              <div className="bg-subBackground rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total Milestone Amount:</span>
                  <span className="text-lg font-bold text-green-600">
                    ${totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
