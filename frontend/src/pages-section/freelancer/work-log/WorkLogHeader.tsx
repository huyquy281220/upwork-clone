"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, Square, DollarSign, User } from "lucide-react";
import { ContractProps, ContractType } from "@/types/contract";

interface WorkLogHeaderProps {
  contract: ContractProps;
  isTimerRunning: boolean;
  currentSession: {
    startTime: string;
    duration: number;
  } | null;
  onStartTimer: () => void;
  onPauseTimer: () => void;
  onStopTimer: () => void;
}

export function WorkLogHeader({
  contract,
  isTimerRunning,
  currentSession,
  onStartTimer,
  onPauseTimer,
  onStopTimer,
}: WorkLogHeaderProps) {
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // console.log(contract);

  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Contract Info */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-foreground">
                {contract.title}
              </h1>
              <Badge
                variant={
                  contract.contractType === ContractType.HOURLY
                    ? "default"
                    : "secondary"
                }
                className="text-white"
              >
                {contract.contractType === ContractType.HOURLY
                  ? "Hourly"
                  : "Fixed Price"}
              </Badge>
            </div>

            <div className="flex items-center gap-6 text-sm text-foreground">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="font-bold opacity-80">
                  {contract.client.user.fullName}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                <span>
                  {contract.contractType === ContractType.HOURLY
                    ? `$${contract.hourlyRate}/hour`
                    : `$${contract.totalPrice?.toLocaleString()} total`}
                </span>
              </div>

              <Badge variant="outline" className="text-xs">
                {contract.status}
              </Badge>
            </div>
          </div>

          {/* Timer Section (Only for Hourly Contracts) */}
          {contract.contractType === ContractType.HOURLY && (
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-mono font-bold text-foreground">
                  {currentSession
                    ? formatTime(currentSession.duration)
                    : "00:00:00"}
                </div>
                <div className="text-xs text-gray-500">Current Session</div>
              </div>

              <div className="flex items-center gap-2">
                {!isTimerRunning ? (
                  <Button
                    onClick={onStartTimer}
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Play className="w-4 h-4" />
                    Start
                  </Button>
                ) : (
                  <>
                    <Button
                      onClick={onPauseTimer}
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2 bg-transparent"
                    >
                      <Pause className="w-4 h-4" />
                      Pause
                    </Button>
                    <Button
                      onClick={onStopTimer}
                      variant="destructive"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <Square className="w-4 h-4" />
                      Stop
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
