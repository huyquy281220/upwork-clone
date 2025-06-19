"use client";

import { Button } from "@/components/ui/button";
import { Paperclip } from "lucide-react";
import { useJobPosting } from "@/hooks/useJobPosting";

export default function Step5Description() {
  const { jobData, updateJobData } = useJobPosting();

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
          className="bg-gray-800 border-gray-600 text-white min-h-[200px] mb-2"
          placeholder="It's OK if you don't know much about the specifics of the work you need done. Freelancers can always send you questions in their proposals and you can connect later to interview them and discuss the details. However, including more detail may help you attract freelancers that are a better match for your job. Good details to include:

          Project scope and deliverables
          Deadline expectations
          Required experience"
        />
        <div className="text-right text-gray-400 text-sm mb-6">
          49,490 characters left
        </div>

        <div className="mb-6">
          <label className="text-white font-semibold block mb-2">
            Need help?
          </label>
          <button className="text-green-400 underline text-sm">
            See examples of effective descriptions
          </button>
        </div>

        <div>
          <Button
            variant="outline"
            className="bg-gray-800 border-gray-600 text-white hover:bg-gray-700 mb-2"
          >
            <Paperclip className="w-4 h-4 mr-2" />
            Attach file
          </Button>
          <p className="text-gray-400 text-sm">Max file size: 100MB</p>
        </div>
      </div>
    </div>
  );
}
