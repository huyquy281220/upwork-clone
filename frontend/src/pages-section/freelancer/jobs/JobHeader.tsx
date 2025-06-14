import { JobMetaData } from "@/pages-section/freelancer/jobs/components/JobMetadata";
import { Building, Calendar, Clock, Wallet } from "lucide-react";
import React from "react";

export const JobHeader = () => {
  const stats = [
    { icon: <Building />, label: "Jobs Posted", value: "12" },
    { icon: <Clock />, label: "Hours on Platform", value: "25,471" },
    { icon: <Wallet />, label: "Hourly Rate", value: "$16.53" },
    { icon: <Calendar />, label: "Member Since", value: "2011" },
  ];

  return (
    <div className="border-b pb-6">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
        Mandarin-speaking Customer Support Specialist (Work-from-Home
        Opportunity)
      </h1>

      <div className="flex flex-wrap items-center gap-4 mb-4">
        <div className="flex items-center">
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
          <div className="ml-3">
            <h3 className="font-semibold">Client Name</h3>
            <div className="flex items-center text-sm text-gray-600">
              <span className="mr-2">⭐⭐⭐⭐⭐</span>
              <span>5.0 (24 reviews)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {stats.map((stat, index) => (
          <JobMetaData
            key={index}
            icon={stat.icon}
            label={stat.label}
            value={stat.value}
          />
        ))}
      </div>
    </div>
  );
};
