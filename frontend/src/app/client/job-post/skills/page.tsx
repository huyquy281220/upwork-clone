export const dynamic = "force-dynamic";

import { StepTwo } from "@/pages-section/client/create-job";
import JobPostingWrapper from "@/providers/JobPostingWrapper";

export default function PostJobSkills() {
  return (
    <JobPostingWrapper currentStep={2}>
      <StepTwo />
    </JobPostingWrapper>
  );
}
