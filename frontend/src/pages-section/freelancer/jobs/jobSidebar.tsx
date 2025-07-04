"use client";

import { Button } from "@/components/ui/button";
import { ClientInfo } from "./ClientInfo";
import { JobActions } from "./JobActions";
import { useRouter } from "next/navigation";

export function JobSidebar({ jobId }: { jobId: string }) {
  const router = useRouter();

  return (
    <div className="space-y-6 pb-10 border-b md:border-0">
      <div className="bg-muted/30 p-4 rounded-lg">
        <Button
          className="w-full bg-green-600 hover:bg-green-700 text-white mb-2"
          onClick={() => router.push(`/freelancer/jobs/${jobId}/apply`)}
        >
          Apply
        </Button>
      </div>

      <JobActions />
      <ClientInfo />
    </div>
  );
}
