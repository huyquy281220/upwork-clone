"use client";

import { NavigationFooter } from "../pages-section/client/create-job";
import { validateCurrentStep } from "@/utils/jobStepsValidation";
import { useRouter } from "next/navigation";
import { useJobPosting } from "@/hooks/useJobPosting";
interface JobPostingWizardProps {
  children: React.ReactNode;
  currentStep: number;
}

export default function JobPostingWrapper({
  children,
  currentStep,
}: JobPostingWizardProps) {
  const router = useRouter();
  const { jobData } = useJobPosting();

  const getNextRoute = () => {
    switch (currentStep) {
      case 1:
        return "/step2";
      case 2:
        return "/step3";
      case 3:
        return "/step4";
      case 4:
        return "/step5";
      case 5:
        return "/client/dashboard";
      default:
        return "/client/dashboard";
    }
  };

  const getPrevRoute = () => {
    switch (currentStep) {
      case 2:
        return "/step1";
      case 3:
        return "/step2";
      case 4:
        return "/step3";
      case 5:
        return "/step4";
      default:
        return "/client/dashboard";
    }
  };

  const handleNext = () => {
    if (validateCurrentStep(currentStep, jobData)) {
      router.push(getNextRoute());
    }
  };

  const handlePrev = () => {
    router.push(getPrevRoute());
  };

  const handleSubmit = () => {
    if (validateCurrentStep(currentStep, jobData)) {
      alert("Job posted!");
      console.log("Job data:", jobData);
    }
  };

  const isNextDisabled = !validateCurrentStep(currentStep, jobData);

  return (
    <div className="min-h-screen bg-background">
      <div className="px-6 py-12">{children}</div>

      <NavigationFooter
        currentStep={currentStep}
        isNextDisabled={isNextDisabled}
        onPrevStep={handlePrev}
        onNextStep={handleNext}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
