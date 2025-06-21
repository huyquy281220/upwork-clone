"use client";

import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useUser } from "@/hooks/useUserInfo";
import { deleteJobById } from "@/services/jobs";
import { ClientUser } from "@/types/user";
import { ModernToast } from "@/components/common/ModernToast";
import { useState } from "react";
import { ToastProps } from "@/types";
import { formatRelativeTime } from "@/utils/getRelativeTime";
import { formatDraftSaved } from "@/utils/getLocalTime";

interface JobPostCardProps {
  title: string;
  jobId: string;
  createdTime: string;
}

export function JobPostCard({ title, jobId, createdTime }: JobPostCardProps) {
  const { data: session } = useSession();
  const { data: user } = useUser<ClientUser>(session?.user.id ?? "");
  const queryClient = useQueryClient();
  const [activeToasts, setActiveToasts] = useState(false);
  const [toast, setToast] = useState<ToastProps>({
    title: "",
    description: "",
    duration: 1500,
    position: "top-center",
    type: "success",
  });

  const handleDeleteJob = async () => {
    try {
      const res = await deleteJobById(jobId, user?.clientProfile.id ?? "");

      if (res.status === 200) {
        setToast((prev) => ({
          ...prev,
          title: "Job deleted",
          description: "Your job has been deleted",
          type: "success",
        }));
        setActiveToasts(true);
        await queryClient.invalidateQueries({
          queryKey: ["jobs", session?.user.id],
        });
      }
    } catch (error) {
      console.log(error);
      setToast((prev) => ({
        ...prev,
        title: "Error deleting job",
        description: "Please try again",
        type: "error",
      }));
      setActiveToasts(true);
    }
  };

  return (
    <div className="bg-muted/30 border border-muted-foreground/20 rounded-lg p-6 hover:bg-muted/50 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="space-y-2 flex-1">
          <h3 className="text-lg font-medium text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">
            Created {formatRelativeTime(createdTime)} by You
          </p>
          <p className="text-sm text-foreground">
            {formatDraftSaved(createdTime)}
          </p>
        </div>

        <div className="flex items-center gap-2 sm:flex-shrink-0">
          <Button
            variant="outline"
            size="sm"
            className="bg-transparent border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
          >
            Edit draft
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="bg-background text-foreground border-muted-foreground/20 hover:bg-muted p-2"
            onClick={handleDeleteJob}
          >
            <Trash2 className="h-4 w-4 text-green-600" />
          </Button>
        </div>
      </div>
      {activeToasts && <ModernToast {...toast} />}
    </div>
  );
}
