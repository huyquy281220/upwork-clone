"use client";

import { NavigationFooter } from "../pages-section/client/create-job";
import { validateCurrentStep } from "@/utils/jobStepsValidation";
import { useRouter } from "next/navigation";
import { useJobPostingContext } from "@/store/JobPostingContext";
import api from "@/services/api";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { ModernToast } from "@/components/common/ModernToast";
import { ToastProps } from "@/types";
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
  const [activeToasts, setActiveToasts] = useState(false);
  const [toast, setToast] = useState<ToastProps>({
    title: "",
    description: "",
    duration: 1500,
    position: "top-center",
    type: "success",
  });

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
    router.push(`/client/job-post/${getPrevRoute()}`);
  };

  const handleSubmit = async () => {
    if (validateCurrentStep(currentStep, jobData)) {
      try {
        const res = await api.post(
          `${process.env.NEXT_PUBLIC_API_URL}/jobs/${session?.user.id}/create`,
          jobData
        );

        if (res.status === 201) {
          resetJobData();
          setToast((prev) => ({
            ...prev,
            title: "Job posted successfully",
            description: "Redirecting to dashboard",
          }));
          setActiveToasts(true);
          setTimeout(() => {
            router.push("/client/dashboard");
          }, 2000);
        }
      } catch (error) {
        console.log(error);
        setToast((prev) => ({
          ...prev,
          title: "Error posting job",
          description: "Please try again",
          type: "error",
        }));
        setActiveToasts(true);
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
