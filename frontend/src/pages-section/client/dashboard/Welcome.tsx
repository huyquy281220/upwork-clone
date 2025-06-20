"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useState } from "react";

export function WelcomeSection() {
  const router = useRouter();
  const { data: session } = useSession();

  const [greeting, setGreeting] = useState("Good day");

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();

      if (hour >= 5 && hour < 12) {
        setGreeting("Good morning");
      } else if (hour >= 12 && hour < 17) {
        setGreeting("Good afternoon");
      } else if (hour >= 17 && hour < 22) {
        setGreeting("Good evening");
      } else {
        setGreeting("Good night");
      }
    };

    // Update greeting immediately
    updateGreeting();

    // Update greeting every minute to handle time changes
    const interval = setInterval(updateGreeting, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <h1 className="text-2xl font-medium text-foreground">
        {greeting}, {session?.user?.name}
      </h1>
      <Button
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md w-fit"
        onClick={() => router.push("/client/post-job/title")}
      >
        + Post a job
      </Button>
    </div>
  );
}
