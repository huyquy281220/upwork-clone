import React from "react";

export const ClientRecentHistory = () => {
  const recentJobs = [
    {
      title: "Finance Assistant (20 hours needed)",
      rating: "⭐⭐⭐⭐⭐",
      hours: "50.0 hours",
      feedback: "Hope to work with him again",
      description: "To implement Annual report",
    },
    {
      title: "Assistance with Client accounts",
      rating: "⭐⭐⭐⭐",
      hours: "43 hours",
      feedback: "Great work on financial reports",
      description: "To implement Financial audit",
    },
    {
      title: "Mandarin Insights Outform: General Securities",
      rating: "⭐⭐⭐⭐⭐",
      hours: "83 hours",
      feedback: "Invaluable member of our support team",
      description: "To implement Audit solutions",
    },
  ];

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold text-gray-800 mb-3">
        Client&#39;s Recent History
      </h2>

      <div className="space-y-4">
        {recentJobs.map((job, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
          >
            <h3 className="font-semibold text-gray-800">{job.title}</h3>
            <div className="flex items-center mt-2 text-sm">
              <span className="text-yellow-500 mr-2">{job.rating}</span>
              <span className="text-gray-600">{job.hours} worked</span>
            </div>
            <p className="text-gray-600 mt-1">{job.feedback}</p>
            <p className="text-gray-500 text-sm mt-2">{job.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
