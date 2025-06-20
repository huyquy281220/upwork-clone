"use client";

import { NavigationFooter } from "../pages-section/client/create-job";
import { validateCurrentStep } from "@/utils/jobStepsValidation";
import { useRouter } from "next/navigation";
import { useJobPostingContext } from "@/store/JobPostingContext";
import api from "@/services/api";
import { useSession } from "next-auth/react";
import { useUser } from "@/hooks/useUserInfo";
import { User } from "@/types/user";
import { toast } from "sonner";
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
  const { data: user } = useUser<User>(session?.user.id ?? "");
  const { jobData } = useJobPostingContext();

  console.log(user);

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
      router.push(`/client/post-job/${getNextRoute()}`);
    }
  };

  const handlePrev = () => {
    router.push(`/client/post-job/${getPrevRoute()}`);
  };

  const handleSubmit = async () => {
    if (validateCurrentStep(currentStep, jobData)) {
      try {
        const res = await api.post(
          `${process.env.NEXT_PUBLIC_API_URL}/jobs/${session?.user.id}/create`,
          jobData
        );

        if (res.status === 201) {
          toast.success("Job posted successfully", {
            description: "Redirecting to dashboard",
          });
          setTimeout(() => {
            router.push("/client/dashboard");
          }, 1000);
        }
      } catch (error) {
        console.log(error);
        toast.error("Error posting job", {
          description: "Please try again",
        });
      }
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
