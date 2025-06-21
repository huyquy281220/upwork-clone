"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Clock, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BudgetData {
  type: "hourly" | "fixed";
  min: number;
  max: number;
}

interface EditBudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentBudget: BudgetData;
  onSave: (budget: BudgetData) => void;
}

export function EditBudgetModal({
  isOpen,
  onClose,
  currentBudget,
  onSave,
}: EditBudgetModalProps) {
  const [budget, setBudget] = useState<BudgetData>(currentBudget);

  const handleSave = () => {
    onSave(budget);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-gray-700 text-foreground max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Edit budget
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Budget Type Selection */}
          <div className="grid grid-cols-2 gap-4">
            <div
              className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                budget.type === "hourly"
                  ? "border-green-500 bg-green-500/10"
                  : "border-gray-600 bg-gray-800/50"
              }`}
              onClick={() => setBudget({ ...budget, type: "hourly" })}
            >
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5" />
                <span className="font-medium">Hourly rate</span>
                <div
                  className={`w-4 h-4 rounded-full border-2 ${
                    budget.type === "hourly"
                      ? "border-green-500 bg-green-500"
                      : "border-gray-400"
                  }`}
                >
                  {budget.type === "hourly" && (
                    <div className="w-2 h-2 bg-white rounded-full m-0.5" />
                  )}
                </div>
              </div>
            </div>

            <div
              className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                budget.type === "fixed"
                  ? "border-green-500 bg-green-500/10"
                  : "border-gray-600 bg-gray-800/50"
              }`}
              onClick={() => setBudget({ ...budget, type: "fixed" })}
            >
              <div className="flex items-center gap-3">
                <Tag className="w-5 h-5" />
                <span className="font-medium">Fixed price</span>
                <div
                  className={`w-4 h-4 rounded-full border-2 ${
                    budget.type === "fixed"
                      ? "border-green-500 bg-green-500"
                      : "border-gray-400"
                  }`}
                >
                  {budget.type === "fixed" && (
                    <div className="w-2 h-2 bg-white rounded-full m-0.5" />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Budget Range */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">From</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  $
                </span>
                <input
                  type="number"
                  value={budget.min}
                  onChange={(e) =>
                    setBudget({ ...budget, min: Number(e.target.value) })
                  }
                  className="bg-gray-800 border-gray-600 text-foreground pl-8"
                  step="0.01"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  {budget.type === "hourly" ? "/hr" : ""}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">To</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  $
                </span>
                <input
                  type="number"
                  value={budget.max}
                  onChange={(e) =>
                    setBudget({ ...budget, max: Number(e.target.value) })
                  }
                  className="bg-gray-800 border-gray-600 text-foreground pl-8"
                  step="0.01"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  {budget.type === "hourly" ? "/hr" : ""}
                </span>
              </div>
            </div>
          </div>

          {budget.type === "hourly" && (
            <div className="space-y-4">
              <p className="text-sm text-gray-400">
                This is the average rate for similar projects.
              </p>

              <div className="text-sm text-gray-300">
                <p>
                  Professionals tend to charge{" "}
                  <span className="font-semibold">$10 - $20</span> /hour (USD)
                  for manual testing projects like yours. Experts may charge
                  higher rates.
                </p>
              </div>

              {/* Simple rate distribution chart */}
              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="flex items-end justify-center gap-1 h-32">
                  <div className="bg-green-500 w-8 h-8 rounded-t"></div>
                  <div className="bg-green-500 w-8 h-16 rounded-t"></div>
                  <div className="bg-green-500 w-8 h-24 rounded-t"></div>
                  <div className="bg-green-500 w-8 h-12 rounded-t"></div>
                  <div className="bg-green-500 w-8 h-6 rounded-t"></div>
                </div>
                <div className="flex justify-between text-xs text-gray-400 mt-2">
                  <span>$5</span>
                  <span>$15</span>
                  <span>$35</span>
                  <span>$45</span>
                  <span>$60</span>
                </div>
                <div className="text-center text-xs text-blue-400 mt-1">
                  hourly rate (USD)
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 pt-6">
          <Button
            variant="ghost"
            onClick={onClose}
            className="text-green-500 hover:text-green-400 hover:bg-green-500/10"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            // disabled={isLoading}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            {/* {isLoading ? "Saving..." : saveText} */}
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
