export const dynamic = "force-dynamic";

import { StepThree } from "@/pages-section/client/create-job";
import JobPostingWrapper from "@/providers/JobPostingWrapper";

export default function PostJobDuration() {
  return (
    <JobPostingWrapper currentStep={3}>
      <StepThree />
    </JobPostingWrapper>
  );
}
