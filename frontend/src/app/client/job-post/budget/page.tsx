export const dynamic = "force-dynamic";

import { StepFive } from "@/pages-section/client/create-job";
import JobPostingWrapper from "@/providers/JobPostingWrapper";

export default function PostJobBudget() {
  return (
    <JobPostingWrapper currentStep={5}>
      <StepFive />
    </JobPostingWrapper>
  );
}
