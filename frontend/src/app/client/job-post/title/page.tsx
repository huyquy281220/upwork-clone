export const dynamic = "force-dynamic";

import { StepOne } from "@/pages-section/client/create-job";
import JobPostingWrapper from "@/providers/JobPostingWrapper";

export default function PostJobTitle() {
  return (
    <JobPostingWrapper currentStep={1}>
      <StepOne />
    </JobPostingWrapper>
  );
}
