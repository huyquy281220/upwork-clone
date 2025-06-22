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
// import { JobProps } from "@/types/jobs";

export default function JobDetail() {
  const { jobData } = useJobPostingContext();
  const { isModalOpen, openModal, closeModal } = useModalManager();

  // const handleEdit = (data: Partial<JobProps>) => {
  //   console.log(data);
  // };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-[80rem] mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <h1 className="text-2xl sm:text-3xl font-semibold text-foreground mb-4 sm:mb-0">
            Job details
          </h1>
          <Button
            className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white"
            // onClick={handlePostJob}
          >
            Post this job
          </Button>
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

          {/* <div className="p-6">
            <CategorySection
              category={jobData.category}
              onEdit={() => handleEdit("category")}
            />
          </div> */}

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
              hoursPerWeek={jobData.hoursPerWeek}
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
            // onClick={onBack}
            // disabled={isLoading}
            className="w-full sm:w-auto bg-white border-gray-300 text-gray-900 hover:bg-gray-50"
          >
            Back
          </Button>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Button
              variant="outline"
              // onClick={onSaveDraft}
              // disabled={isLoading}
              className="w-full sm:w-auto bg-white border-green-600 text-green-600 hover:bg-green-50"
            >
              Save as a draft
            </Button>
            <Button
              // onClick={onPostJob}
              // disabled={isLoading}
              className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white"
            >
              {/* {isLoading ? "Posting..." : "Post this job"} */}
              Post this job
            </Button>
          </div>
        </div>

        {/* All modals remain the same */}
        <EditTitleModal
          isOpen={isModalOpen("edit-title")}
          onClose={() => closeModal()}
          currentTitle={jobData.title}
          onSave={() => {}}
        />

        <EditDescriptionModal
          isOpen={isModalOpen("edit-description")}
          onClose={() => closeModal()}
          currentDescription={jobData.description}
          onSave={() => {}}
        />

        <EditSkillsModal
          isOpen={isModalOpen("edit-skills")}
          onClose={() => closeModal()}
          currentSkills={jobData.skills}
          onSave={() => {}}
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
          onSave={() => {}}
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
          onSave={() => {}}
        />
      </div>
    </div>
  );
}
