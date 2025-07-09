"use client";

import { useJobPostingContext } from "@/store/JobPostingContext";

export default function Step5Description() {
  const { jobData, updateJobData } = useJobPostingContext();

  return (
    <div className="grid grid-cols-2 gap-12  mx-auto">
      <div>
        <div className="text-sm text-gray-400 mb-2">5/5 Job post</div>
        <h1 className="text-4xl font-bold text-white mb-6">
          Start the conversation.
        </h1>
        <div className="text-gray-300 mb-6">
          <p className="font-semibold mb-4">Talent are looking for:</p>
          <ul className="space-y-2">
            <li>• Clear expectations about your task or deliverables</li>
            <li>• The skills required for your work</li>
            <li>• Good communication</li>
            <li>• Details about how you or your team like to work</li>
          </ul>
        </div>
      </div>
      <div>
        <label className="text-white text-lg mb-4 block">
          Describe what you need
        </label>
        <textarea
          value={jobData.description}
          onChange={(e) => updateJobData({ description: e.target.value })}
          className="w-full bg-gray-800 border-gray-600 text-white min-h-[300px] p-2 mb-2 rounded-md"
          maxLength={49490}
        />
        <div className="text-right text-gray-400 text-sm mb-6">
          {49490 - jobData.description.length} characters left
        </div>
      </div>
    </div>
  );
}
