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
import { useSession } from "next-auth/react";
import { useUser } from "@/hooks/useUserInfo";
import { Availability, User } from "@/types/user";
import api from "@/services/api";
import { useQueryClient } from "@tanstack/react-query";

interface AvailabilityModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentContractToHire: boolean;
}

const availabilityOptions = [
  { value: "MORE_THAN_30", label: "More than 30 hrs/week" },
  { value: "LESS_THAN_30", label: "Less than 30 hrs/week" },
  { value: "AS_NEEDED", label: "As needed - open to offers" },
  { value: "NONE", label: "None" },
];

export function AvailabilityModal({
  open,
  onOpenChange,
  currentContractToHire,
}: AvailabilityModalProps) {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const { data: user } = useUser<User>(session?.user?.id ?? "");

  console.log(user);

  const [availability, setAvailability] = useState(
    user?.freelancerProfile?.available
  );
  const [contractToHire, setContractToHire] = useState(currentContractToHire);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const response = await api.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/update`,
        { available: availability, id: session?.user?.id }
      );

      if (response.status !== 200) {
        throw new Error("Failed to update availability");
      }

      await queryClient.invalidateQueries({
        queryKey: ["user", session?.user?.id],
      });

      onOpenChange(false);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setAvailability(user?.freelancerProfile?.available);
    setContractToHire(currentContractToHire);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-[500px] bg-card text-card-foreground"
        showCloseButton={false}
      >
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <DialogTitle className="text-xl font-semibold">
            Availability
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
          <div>
            <h3 className="font-medium mb-2">Hours per week</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Knowing how much you can work helps Upwork find the right jobs for
              you.
            </p>

            <div className="space-y-3">
              <p className="text-sm font-medium">I can currently work</p>
              <div className="space-y-2">
                {availabilityOptions.map((option) => (
                  <div
                    key={option.value}
                    className="flex items-center space-x-2"
                  >
                    <input
                      type="radio"
                      id={option.value}
                      name="availability"
                      value={option.value}
                      checked={availability === option.value}
                      onChange={() =>
                        setAvailability(option.value as Availability)
                      }
                      className="h-4 w-4 text-green-600 focus:ring-green-600"
                    />
                    <label htmlFor={option.value} className="text-sm">
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-4">Contract-to-hire</h3>
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="contract-to-hire"
                checked={contractToHire}
                onChange={(e) => setContractToHire(e.target.checked)}
                className="h-4 w-4 mt-1 text-green-600 focus:ring-green-600 rounded"
              />
              <div className="space-y-1">
                <label
                  htmlFor="contract-to-hire"
                  className="text-sm font-medium"
                >
                  I&#39;m open to contract-to-hire opportunities
                </label>
                <p className="text-xs text-muted-foreground">
                  This means you&#39;ll start with a contract and may later
                  explore a full-time option
                </p>
              </div>
            </div>
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
          >
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
