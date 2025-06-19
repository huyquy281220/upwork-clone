"use client";

import { useJobPosting } from "@/hooks/useJobPosting";

export default function StepOne() {
  const { jobData, updateJobData } = useJobPosting();

  return (
    <div className="grid grid-cols-2 gap-28 mx-auto">
      <div>
        <div className="text-sm text-foreground mb-2">1/5 Job post</div>
        <h1 className="text-4xl font-bold text-foreground mb-6">
          Let&#39;s start with a strong title.
        </h1>
        <p className="text-foreground mb-8">
          This helps your job post stand out to the right candidates. It&#39;s
          the first thing they&#39;ll see, so make it count!
        </p>
      </div>
      <div>
        <label htmlFor="title" className="text-foreground text-lg mb-4 block">
          Write a title for your job post
        </label>
        <input
          id="title"
          value={jobData.title}
          onChange={(e) => updateJobData({ title: e.target.value })}
          className="w-full bg-gray-800 border-gray-600 text-white text-lg p-4 mb-6"
          placeholder="e.g. Build a responsive website"
        />

        <div className="mb-6">
          <h3 className="text-foreground font-semibold mb-4">Example titles</h3>
          <ul className="space-y-2 text-foreground">
            <li>
              • Spanish translator needed to localize marketing materials,
              website
            </li>
            <li>• Localize video script and app content to Korean</li>
            <li>• Translate English software user guide to German</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
