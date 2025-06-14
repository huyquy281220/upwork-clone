import React from "react";
import { JobMetaData } from "@/pages-section/freelancer/jobs/components/JobMetadata";
import { UserRound, MessageCircle, Eye } from "lucide-react";

export const JobActivity = () => {
  const activityItems = [
    { icon: <UserRound />, label: "Proposals", value: "5-10" },
    { icon: <MessageCircle />, label: "Messaging", value: "Active" },
    { icon: <Eye />, label: "Last Viewed", value: "3 hours ago" },
  ];

  return (
    <div className="border-b pb-6 mt-6">
      <h2 className="text-xl font-bold text-gray-800 mb-3">
        Activity on this Job
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {activityItems.map((item, index) => (
          <JobMetaData
            key={index}
            icon={item.icon}
            label={item.label}
            value={item.value}
          />
        ))}
      </div>

      <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
        <p className="text-yellow-800">
          Upgrade your membership to see the bid range and get more insights
          about this job.
        </p>
      </div>
    </div>
  );
};
