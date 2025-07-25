"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";
import { MilestoneProps } from "@/types/contract";
import { JobType } from "@/types/jobs";

interface MilestonesSectionProps {
  milestones: MilestoneProps[];
  setMilestones: (milestones: MilestoneProps[]) => void;
  contractType: string;
}

export function MilestonesSection({
  milestones,
  setMilestones,
  contractType,
}: MilestonesSectionProps) {
  const addMilestone = () => {
    const newMilestone: MilestoneProps = {
      id: Date.now().toString(),
      name: "",
      description: "",
      amount: "",
      dueDate: "",
    };
    setMilestones([...milestones, newMilestone]);
  };

  const removeMilestone = (id: string) => {
    setMilestones(milestones.filter((m) => m.id !== id));
  };

  const updateMilestone = (
    id: string,
    field: keyof MilestoneProps,
    value: string
  ) => {
    setMilestones(
      milestones.map((m) => (m.id === id ? { ...m, [field]: value } : m))
    );
  };

  const totalAmount = milestones.reduce(
    (sum, milestone) => sum + (Number.parseFloat(milestone.amount) || 0),
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
        <p className="text-sm text-gray-600">
          Break down the project into smaller deliverables with payments.
        </p>
      </CardHeader>
      <CardContent>
        {milestones.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p className="mb-4">No milestones added yet.</p>
            <Button variant="outline" onClick={addMilestone}>
              <Plus className="w-4 h-4 mr-2" />
              Add First Milestone
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {milestones.map((milestone, index) => (
              <div key={milestone.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium">Milestone {index + 1}</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeMilestone(milestone.id)}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`milestone-name-${milestone.id}`}>
                      Milestone Name
                    </Label>
                    <Input
                      id={`milestone-name-${milestone.id}`}
                      value={milestone.name}
                      onChange={(e) =>
                        updateMilestone(milestone.id, "name", e.target.value)
                      }
                      placeholder="e.g., Initial Design Mockups"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`milestone-amount-${milestone.id}`}>
                      Amount
                    </Label>
                    <div className="relative mt-1">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        $
                      </span>
                      <Input
                        id={`milestone-amount-${milestone.id}`}
                        type="number"
                        value={milestone.amount}
                        onChange={(e) =>
                          updateMilestone(
                            milestone.id,
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
                    <Label htmlFor={`milestone-due-${milestone.id}`}>
                      Due Date
                    </Label>
                    <Input
                      id={`milestone-due-${milestone.id}`}
                      type="date"
                      value={milestone.dueDate}
                      onChange={(e) =>
                        updateMilestone(milestone.id, "dueDate", e.target.value)
                      }
                      className="mt-1"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor={`milestone-description-${milestone.id}`}>
                      Description
                    </Label>
                    <Textarea
                      id={`milestone-description-${milestone.id}`}
                      value={milestone.description}
                      onChange={(e) =>
                        updateMilestone(
                          milestone.id,
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
              <div className="bg-gray-50 rounded-lg p-4">
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
