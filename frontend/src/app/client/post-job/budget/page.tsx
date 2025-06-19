import { StepFour } from "@/pages-section/client/create-job";
import JobPostingWrapper from "@/providers/JobPostingWrapper";

export default function PostJobBudget() {
  return (
    <JobPostingWrapper currentStep={4}>
      <StepFour />
    </JobPostingWrapper>
  );
}
