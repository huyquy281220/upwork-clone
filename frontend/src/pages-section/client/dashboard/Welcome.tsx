"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { InfiniteLoading } from "@/components/common/InfiniteLoading";

export function WelcomeSection() {
  const router = useRouter();
  const { data: session } = useSession();
  const [greeting, setGreeting] = useState("Good day");
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Mark as hydrated first
    setIsHydrated(true);

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

    // Only update greeting after hydration
    updateGreeting();

    // Update greeting every minute to handle time changes
    const interval = setInterval(updateGreeting, 60000);

    return () => clearInterval(interval);
  }, []);

  if (!session) return <InfiniteLoading />;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <h1 className="text-2xl font-medium text-foreground">
        {/* Show consistent text until hydrated */}
        {isHydrated ? greeting : "Good day"}, {session?.user?.name}
      </h1>
      <Button
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md w-fit"
        onClick={() => router.push("/client/job-post/title")}
      >
        + Post a job
      </Button>
    </div>
  );
}
