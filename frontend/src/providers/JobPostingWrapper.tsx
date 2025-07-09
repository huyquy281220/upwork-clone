"use client";

import { NavigationFooter } from "../pages-section/client/create-job";
import { validateCurrentStep } from "@/utils/jobStepsValidation";
import { useRouter } from "next/navigation";
import { useJobPostingContext } from "@/store/JobPostingContext";
import api from "@/services/api";
import { useSession } from "next-auth/react";
import { ModernToast } from "@/components/common/ModernToast";
import { useToast } from "@/hooks/useToast";
interface JobPostingWizardProps {
  children: React.ReactNode;
  currentStep: number;
}

export default function JobPostingWrapper({
  children,
  currentStep,
}: JobPostingWizardProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const { jobData, resetJobData } = useJobPostingContext();
  const { toast, showErrorToast, showSuccessToast, activeToasts } = useToast();

  const getNextRoute = () => {
    switch (currentStep) {
      case 1:
        return "skills";
      case 2:
        return "duration";
      case 3:
        return "budget";
      case 4:
        return "description";
      case 5:
        return "/client/dashboard";
      default:
        return "/client/dashboard";
    }
  };

  const getPrevRoute = () => {
    switch (currentStep) {
      case 2:
        return "title";
      case 3:
        return "skills";
      case 4:
        return "duration";
      case 5:
        return "budget";
      default:
        return "/client/dashboard";
    }
  };

  const handleNext = () => {
    if (validateCurrentStep(currentStep, jobData)) {
      router.push(`/client/job-post/${getNextRoute()}`);
    }
  };

  const handlePrev = () => {
    if (currentStep === 1) {
      router.back();
    } else {
      router.push(`/client/job-post/${getPrevRoute()}`);
    }
  };

  const handleSubmit = async () => {
    if (validateCurrentStep(currentStep, jobData)) {
      try {
        const res = await api.post(
          `${process.env.NEXT_PUBLIC_API_URL}/jobs/${session?.user.id}/create`,
          { ...jobData, skills: jobData.skills.map((skill) => skill.id) }
        );

        if (res.status === 201) {
          showSuccessToast(
            "Job posted successfully",
            "Redirecting to dashboard",
            1500
          );
          setTimeout(() => {
            resetJobData();
            router.push("/client/dashboard");
          }, 1700);
        }
      } catch (error) {
        console.log(error);
        showErrorToast("Error posting job", "Please try again", 1500);
      }
    }
  };

  const isNextDisabled = !validateCurrentStep(currentStep, jobData);

  return (
    <div className="min-h-screen bg-background">
      <div className="px-6 py-12">{children}</div>
      {activeToasts && <ModernToast {...toast} />}
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
