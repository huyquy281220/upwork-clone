import { Button } from "@/components/ui/button";
import { ClientInfo } from "./ClientInfo";
import { JobActions } from "./JobActions";

export function JobSidebar() {
  return (
    <div className="space-y-6 pb-10 border-b md:border-0">
      <div className="bg-muted/30 p-4 rounded-lg">
        <Button className="w-full bg-green-600 hover:bg-green-700 text-white mb-2">
          Apply
        </Button>
      </div>

      <JobActions />
      <ClientInfo />
    </div>
  );
}
