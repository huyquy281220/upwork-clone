"use client";

import { Button } from "@/components/ui/button";
import { ClientInfo } from "./ClientInfo";
import { JobActions } from "./JobActions";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { ClientUser } from "@/types/user";

export function JobSidebar({
  jobId,
  isApplied,
  client,
}: {
  jobId: string;
  client: ClientUser;
  isApplied: boolean;
}) {
  const router = useRouter();

  return (
    <div className="space-y-6 pb-10 border-b md:border-0">
      <div className="bg-muted/30 p-4 rounded-lg">
        <Button
          className={cn(
            "w-full bg-green-600 hover:bg-green-700 text-white mb-2",
            isApplied ? "cursor-not-allowed" : "cursor-pointer"
          )}
          onClick={() => router.push(`/freelancer/jobs/${jobId}/apply`)}
          disabled={isApplied}
        >
          {isApplied ? "Applied" : "Apply"}
        </Button>
      </div>

      <JobActions />
      <ClientInfo client={client} />
    </div>
  );
}
