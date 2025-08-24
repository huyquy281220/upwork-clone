"use client";

import { Button } from "@/components/ui/button";
import { JobTitleSection } from "./JobTitle";
import { JobDescriptionSection } from "./JobDescription";
import { SkillsSection } from "./JobSkills";
import { ScopeSection } from "./JobScope";
import { BudgetSection } from "./JobBudget";
import {
  EditBudgetModal,
  EditDescriptionModal,
  EditScopeModal,
  EditSkillsModal,
  EditTitleModal,
} from "@/components/modals/client";
import { useJobPostingContext } from "@/store/JobPostingContext";
import { useModalManager } from "@/hooks/useModalManager";
import { CreateJobProps, JobWithStatsProps } from "@/types/jobs";
import { useCallback, useEffect } from "react";
import { getJobById, updateJobById } from "@/services/jobs";
import { useParams, useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ClientUser } from "@/types/user";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/useToast";
import { ModernToast } from "@/components/common/ModernToast";
import { getSkillsByJobId } from "@/services/skills";
import { Skill } from "@/types";
import { InfiniteLoading } from "@/components/common/InfiniteLoading";
import { JobCategory } from "./JobCategory";

export default function JobDetail() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data: session } = useSession();
  const { updateJobData, resetJobData, jobData } = useJobPostingContext();
  const { isModalOpen, openModal, closeModal } = useModalManager();
  const { toast, showSuccessToast, showErrorToast, activeToasts } = useToast();

  const params = useParams();
  const jobId = params.jobId as string;

  const { data: skillsInJob, isLoading: isSkillsLoading } = useQuery<Skill[]>({
    queryKey: ["skills-in-job", jobId],
    queryFn: () => getSkillsByJobId(jobId),
    enabled: !!jobId,
  });

  const { data: jobWithStats, isLoading: isJobDetailLoading } =
    useQuery<JobWithStatsProps>({
      queryKey: ["job-detail", jobId],
      queryFn: () => getJobById(jobId),
      enabled: !!jobId,
    });

  const jobDetail = jobWithStats?.job;

  const clientInfo = queryClient.getQueryData<ClientUser>([
    "user",
    session?.user.id,
  ]);

  useEffect(() => {
    if (jobWithStats) {
      updateJobData(jobWithStats.job);
    }
  }, [jobWithStats, updateJobData]);

  const handleUpdate = useCallback(
    <K extends keyof CreateJobProps>(field: K, value: CreateJobProps[K]) => {
      updateJobData({ [field]: value });
    },
    [updateJobData]
  );

  const handlePostJob = async () => {
    try {
      const res = await updateJobById(
        jobId,
        clientInfo?.clientProfile.id ?? "",
        {
          ...jobData,
        }
      );

      if (res.status === 200) {
        showSuccessToast(
          "Job posted successfully",
          "Redirecting to dashboard",
          1400
        );
        setTimeout(() => {
          resetJobData();
          router.push("/client/dashboard");
        }, 1600);
      }
    } catch (error) {
      console.log(error);
      showErrorToast("Failed to post job", "Please try again", 1400);
    }
  };

  if (isJobDetailLoading || isSkillsLoading || !session) {
    return <InfiniteLoading />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-[80rem] mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <h1 className="text-2xl sm:text-3xl font-semibold text-foreground mb-4 sm:mb-0">
            Job details
          </h1>
        </div>

        {/* Single container with all sections */}
        <div className="rounded-lg divide-y divide-gray-700 border border-gray-700">
          <div className="p-6">
            <JobTitleSection
              title={jobData.title}
              onEdit={() => openModal("edit-title")}
            />
          </div>

          <div className="p-6">
            <JobDescriptionSection
              description={jobData.description}
              onEdit={() => openModal("edit-description")}
            />
          </div>

          <div className="p-6">
            <JobCategory
              category={jobDetail?.category || ""}
              // onEdit={() => handleEdit("category")}
            />
          </div>

          <div className="p-6">
            <SkillsSection
              skills={jobData.skills}
              onEdit={() => openModal("edit-skills")}
            />
          </div>

          <div className="p-6">
            <ScopeSection
              projectLength={jobData.projectLength}
              experienceLevel={jobData.experienceLevel}
              jobDuration={jobData.jobDuration}
              contractToHire={jobData.contractToHire}
              onEdit={() => openModal("edit-scope")}
            />
          </div>

          <div className="p-6">
            <BudgetSection
              jobType={jobData.jobType}
              hourlyRateMin={jobData.hourlyRateMin}
              hourlyRateMax={jobData.hourlyRateMax}
              fixedPrice={jobData.fixedPrice}
              onEdit={() => openModal("edit-budget")}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center pt-6">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="w-full sm:w-auto bg-white border-gray-300 text-gray-900"
          >
            Back
          </Button>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Button
              onClick={handlePostJob}
              className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white"
            >
              Post this job
            </Button>
          </div>
        </div>

        {/* All modals remain the same */}
        <EditTitleModal
          isOpen={isModalOpen("edit-title")}
          onClose={() => closeModal()}
          currentTitle={jobData.title}
          onUpdate={(title) => handleUpdate("title", title)}
        />

        <EditDescriptionModal
          isOpen={isModalOpen("edit-description")}
          onClose={() => closeModal()}
          currentDescription={jobData.description}
          onSave={(description) => handleUpdate("description", description)}
        />

        <EditSkillsModal
          isOpen={isModalOpen("edit-skills")}
          onClose={() => closeModal()}
          currentSkills={skillsInJob ?? []}
          jobTitle={jobData.title}
          onSave={(skills) => handleUpdate("skills", skills)}
        />

        <EditScopeModal
          isOpen={isModalOpen("edit-scope")}
          onClose={() => closeModal()}
          currentScope={{
            projectLength: jobData.projectLength,
            experienceLevel: jobData.experienceLevel,
            hoursPerWeek: jobData.hoursPerWeek,
            jobDuration: jobData.jobDuration,
            contractToHire: jobData.contractToHire,
          }}
          onSave={updateJobData}
        />

        <EditBudgetModal
          isOpen={isModalOpen("edit-budget")}
          onClose={() => closeModal()}
          currentBudget={{
            jobType: jobData.jobType,
            hourlyRateMin: jobData.hourlyRateMin,
            hourlyRateMax: jobData.hourlyRateMax,
            fixedPrice: jobData.fixedPrice,
          }}
          onSave={updateJobData}
        />

        {/* toast */}
        {activeToasts && <ModernToast {...toast} />}
      </div>
    </div>
  );
}
