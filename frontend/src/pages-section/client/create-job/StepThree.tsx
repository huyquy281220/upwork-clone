"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Edit } from "lucide-react";
import { useJobPosting } from "@/hooks/useJobPosting";

export default function Step3Scope() {
  const { jobData, updateJobData } = useJobPosting();

  return (
    <div className="grid grid-cols-2 gap-12  mx-auto">
      <div>
        <div className="text-sm text-foreground mb-2">3/5 Job post</div>
        <h1 className="text-4xl font-bold text-foreground mb-6">
          Next, estimate the scope of your work.
        </h1>
        <p className="text-foreground">
          Consider the size of your project and the time it will take.
        </p>
      </div>
      <div className="space-y-6">
        {/* Scope Selection */}
        <div>
          <RadioGroup
            value={jobData.projectLength}
            onValueChange={(value) => updateJobData({ projectLength: value })}
            className="space-y-4"
          >
            <div className="flex items-start space-x-3">
              <RadioGroupItem
                value="large"
                id="large"
                className="mt-1 border-2 border-gray-400"
              />
              <div>
                <label
                  htmlFor="large"
                  className="text-foreground font-semibold text-lg"
                >
                  Large
                </label>
                <p className="text-gray-500 text-sm">
                  Longer term or complex initiatives (ex. translate and localize
                  website from English to Spanish in 10+ dialects)
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <RadioGroupItem
                value="medium"
                id="medium"
                className="mt-1 border-2 border-gray-400"
              />
              <div>
                <label
                  htmlFor="medium"
                  className="text-foreground font-semibold text-lg"
                >
                  Medium
                </label>
                <p className="text-gray-500 text-sm">
                  Well-defined projects (ex. translate technical documentation
                  from Chinese to English)
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <RadioGroupItem
                value="small"
                id="small"
                className="mt-1 border-2 border-gray-400"
              />
              <div>
                <label
                  htmlFor="small"
                  className="text-foreground font-semibold text-lg"
                >
                  Small
                </label>
                <p className="text-gray-500 text-sm">
                  Quick and straightforward tasks (ex. translate an article from
                  English into French)
                </p>
              </div>
            </div>
          </RadioGroup>
        </div>

        {/* Duration Selection */}
        {jobData.projectLength && (
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <span className="text-white font-semibold">
                {jobData.projectLength === "medium"
                  ? "Medium"
                  : jobData.projectLength === "large"
                  ? "Large"
                  : "Small"}
              </span>
              <button className="text-green-400">
                <Edit className="w-4 h-4" />
              </button>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              {jobData.projectLength === "medium"
                ? "Well-defined projects (ex. translate technical documentation from Chinese to English)"
                : jobData.projectLength === "large"
                ? "Longer term or complex initiatives (ex. translate and localize website from English to Spanish in 10+ dialects)"
                : "Quick and straightforward tasks (ex. translate an article from English into French)"}
            </p>

            <label className="text-white font-semibold block mb-3">
              How long will your work take?
            </label>
            <RadioGroup
              value={jobData.hoursPerWeek}
              onValueChange={(value) => updateJobData({ hoursPerWeek: value })}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="more-than-6" id="more-than-6" />
                <label htmlFor="more-than-6" className="text-white">
                  More than 6 months
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="3-to-6" id="3-to-6" />
                <label htmlFor="3-to-6" className="text-white">
                  3 to 6 months
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="1-to-3" id="1-to-3" />
                <label htmlFor="1-to-3" className="text-white">
                  1 to 3 months
                </label>
              </div>
            </RadioGroup>
          </div>
        )}

        {/* Experience Level */}
        {jobData.jobDuration && (
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <span className="text-white font-semibold">
                More than 6 months
              </span>
              <button className="text-green-400">
                <Edit className="w-4 h-4" />
              </button>
            </div>

            <label className="text-white font-semibold block mb-2">
              What level of experience will it need?
            </label>
            <p className="text-gray-400 text-sm mb-4">
              This won&#39;t restrict any proposals, but helps match expertise
              to your budget.
            </p>

            <RadioGroup
              value={jobData.experienceLevel}
              onValueChange={(value) =>
                updateJobData({ experienceLevel: value })
              }
              className="space-y-3"
            >
              <div className="flex items-start space-x-3">
                <RadioGroupItem value="entry" id="entry" className="mt-1" />
                <div>
                  <label htmlFor="entry" className="text-white font-semibold">
                    Entry
                  </label>
                  <p className="text-gray-400 text-sm">
                    Looking for someone relatively new to this field
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <RadioGroupItem
                  value="intermediate"
                  id="intermediate"
                  className="mt-1"
                />
                <div>
                  <label
                    htmlFor="intermediate"
                    className="text-white font-semibold"
                  >
                    Intermediate
                  </label>
                  <p className="text-gray-400 text-sm">
                    Looking for substantial experience in this field
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <RadioGroupItem value="expert" id="expert" className="mt-1" />
                <div>
                  <label htmlFor="expert" className="text-white font-semibold">
                    Expert
                  </label>
                  <p className="text-gray-400 text-sm">
                    Looking for comprehensive and deep expertise in this field
                  </p>
                </div>
              </div>
            </RadioGroup>
          </div>
        )}

        {/* Contract to Hire */}
        {jobData.contractToHire && (
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <span className="text-foreground font-semibold">
                Intermediate level
              </span>
              <button className="text-green-400">
                <Edit className="w-4 h-4" />
              </button>
            </div>

            <label className="text-foreground font-semibold block mb-2">
              Is this job a contract-to-hire opportunity?
            </label>
            <p className="text-gray-400 text-sm mb-4">
              This helps set expectations with talent and won&#39;t restrict who
              can submit proposals.
            </p>

            <RadioGroup
              value={jobData.contractToHire ? "true" : "false"}
              onValueChange={(value) =>
                updateJobData({ contractToHire: value === "true" })
              }
              className="space-y-3"
            >
              <div className="flex items-start space-x-3">
                <RadioGroupItem value="yes" id="yes" className="mt-1" />
                <div>
                  <label
                    htmlFor="yes"
                    className="text-foreground font-semibold"
                  >
                    Yes, this could become full time
                  </label>
                  <p className="text-gray-400 text-sm">
                    After a trial period, you can pay a one-time fee to convert
                    the contract.
                    <button className="text-green-400 underline ml-1">
                      Learn more
                    </button>
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <RadioGroupItem value="no" id="no" className="mt-1" />
                <div>
                  <label htmlFor="no" className="text-foreground font-semibold">
                    No, not at this time
                  </label>
                </div>
              </div>
            </RadioGroup>
          </div>
        )}
      </div>
    </div>
  );
}
