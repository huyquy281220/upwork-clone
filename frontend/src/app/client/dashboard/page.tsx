"use client";

import Link from "next/link";

export default function ClientDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Client Dashboard</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="border rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Active Jobs</h2>
          <p className="text-gray-600 dark:text-gray-300">
            You don&apos;t have any active jobs yet.
          </p>
          <Link
            href="/client/post-job"
            className="block mt-4 text-green-600 hover:text-green-700 font-medium"
          >
            Post a job
          </Link>
        </div>

        <div className="border rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <p className="text-gray-600 dark:text-gray-300">
            No recent activity to display.
          </p>
        </div>
      </div>

      <div className="border rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Recommendations</h2>
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-300">
            Complete your profile to get personalized freelancer
            recommendations.
          </p>
          <button className="px-4 py-2 bg-green-600  rounded hover:bg-green-700">
            Complete Profile
          </button>
        </div>
      </div>
    </div>
  );
}
