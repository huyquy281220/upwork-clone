"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface EditTitleModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTitle: string;
  onSave: (title: string) => void;
}

const exampleTitles = [
  "Build responsive WordPress site with booking/payment functionality",
  "AR experience needed for virtual product demos (ARCore)",
  "Developer needed to update Android app UI for new OS/device specs",
];

export function EditTitleModal({
  isOpen,
  onClose,
  currentTitle,
  onSave,
}: EditTitleModalProps) {
  const [title, setTitle] = useState(currentTitle);

  const handleSave = () => {
    onSave(title);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full sm:max-w-3xl bg-gray-900 border-gray-700 text-foreground ">
        <DialogHeader>
          <DialogTitle>
            <p className="text-xl font-semibold text-white">Edit title</p>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4 text-white">
              Write a title for your job post
            </h3>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full h-10 pl-2 bg-gray-800 border-gray-600 text-foreground"
              placeholder="Enter job title"
            />
          </div>

          <div>
            <h4 className="text-base font-medium mb-3 text-white">
              Example titles
            </h4>
            <ul className="space-y-2">
              {exampleTitles.map((example, index) => (
                <li key={index} className="text-gray-300 text-sm">
                  • {example}
                </li>
              ))}
            </ul>
          </div>
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
