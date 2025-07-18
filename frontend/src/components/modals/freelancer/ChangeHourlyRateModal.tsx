"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Info } from "lucide-react";
import api from "@/services/api";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { InfiniteLoading } from "@/components/common/InfiniteLoading";

interface ChangeHourlyRateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentRate: number;
  userId: string;
}

export function ChangeHourlyRateModal({
  open,
  onOpenChange,
  currentRate,
  userId,
}: ChangeHourlyRateModalProps) {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const [hourlyRate, setHourlyRate] = useState(currentRate);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const serviceFee = hourlyRate * 0.1; // 10% service fee
  const youReceive = hourlyRate - serviceFee;

  if (!session) return <InfiniteLoading />;

  const handleSave = async () => {
    setStatus("loading");
    try {
      const response = await api.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/update`,
        { id: userId, freelancerProfile: { hourlyRate } }
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
    setHourlyRate(currentRate);
    setStatus("idle");
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
            Change hourly rate
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
          <p className="text-sm text-muted-foreground">
            Please note that your new hourly rate will only apply to new
            contracts.
          </p>

          <p className="text-sm">
            Your profile rate:{" "}
            <span className="font-semibold">${currentRate.toFixed(2)}/hr</span>
          </p>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label htmlFor="hourlyRate" className="text-sm font-medium">
                  Hourly Rate
                </label>
                <p className="text-xs text-muted-foreground">
                  Total amount the client will see
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg">$</span>
                <input
                  id="hourlyRate"
                  type="number"
                  value={hourlyRate.toFixed(2)}
                  onChange={(e) =>
                    setHourlyRate(Number.parseFloat(e.target.value) || 0)
                  }
                  className="w-20 text-right rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                  step="0.01"
                  min="0"
                />
                <span className="text-sm text-muted-foreground">/hr</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">
                  Prowork Service Fee
                </label>
                <p className="text-xs text-muted-foreground">
                  Fees vary and are shown before contract acceptance
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg">-$</span>
                <div className="w-20 text-right bg-muted px-3 py-2 rounded-md text-sm">
                  {serviceFee.toFixed(2)}
                </div>
                <span className="text-sm text-muted-foreground">/hr</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium">
                  You&#39;ll Receive
                </label>
                <Info className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg">$</span>
                <div className="w-20 text-right bg-muted px-3 py-2 rounded-md text-sm font-medium">
                  {youReceive.toFixed(2)}
                </div>
                <span className="text-sm text-muted-foreground">/hr</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              The estimated amount you&#39;ll receive after service fees
            </p>
          </div>
        </div>

        {status === "success" && (
          <p className="text-green-500">Add hourly rate successfully.</p>
        )}
        {status === "error" && (
          <p className="text-red-500">Failed to add hourly rate.</p>
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
          >
            {status === "loading" ? "Saving..." : "Save"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
