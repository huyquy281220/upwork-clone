import "@/app/globals.css";
import { ChildrenProps } from "@/types";
import { JobPostingProvider } from "@/store/JobPostingContext";

export default function ClientLayoutWrapper({ children }: ChildrenProps) {
  return (
    <JobPostingProvider>
      <>{children}</>
    </JobPostingProvider>
  );
}
