"use client";

import { Button } from "@/components/ui/button";

export function WelcomeSection() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <h1 className="text-2xl font-medium text-foreground">
        Good evening, Huy
      </h1>
      <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md w-fit">
        + Post a job
      </Button>
    </div>
  );
}
