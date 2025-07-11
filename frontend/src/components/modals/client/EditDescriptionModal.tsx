"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface EditDescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentDescription: string;
  onSave: (description: string) => void;
}

export function EditDescriptionModal({
  isOpen,
  onClose,
  currentDescription,
  onSave,
}: EditDescriptionModalProps) {
  const [description, setDescription] = useState(currentDescription);
  const maxLength = 50000;
  const charactersLeft = maxLength - description.length;

  const handleSave = () => {
    onSave(description);
    onClose();
  };

  const isShort = description.length < 100;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full sm:max-w-3xl bg-gray-900 border-gray-700 text-foreground max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-white">
            Edit description
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="relative">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full min-h-[200px] p-3 bg-gray-800 border-yellow-500 text-white rounded-md resize-none"
              placeholder="Describe your project in detail..."
              maxLength={maxLength}
            />
            <div className="absolute bottom-3 right-3 text-sm text-gray-400">
              {charactersLeft.toLocaleString()} characters left
            </div>
          </div>

          {isShort && (
            <div className="flex items-start gap-2 text-yellow-500 text-sm">
              <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <p>
                Your description looks a little short. Add details like your
                project milestones and a bit about your team.
              </p>
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
