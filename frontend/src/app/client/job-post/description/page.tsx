import { StepFive } from "@/pages-section/client/create-job";
import JobPostingWrapper from "@/providers/JobPostingWrapper";

export default function PostJobDescription() {
  return (
    <JobPostingWrapper currentStep={5}>
      <StepFive />
    </JobPostingWrapper>
  );
}
