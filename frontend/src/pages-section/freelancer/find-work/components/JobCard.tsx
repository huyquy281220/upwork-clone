"use client";

import { Heart, ThumbsDown } from "lucide-react";
import type { JobProps } from "@/types/jobs";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { formatRelativeTime } from "@/utils/getRelativeTime";

interface JobCardProps {
  job: JobProps;
  index: number;
  onSaveJob: (jobId: string) => void;
}

export function JobCard({ job, index, onSaveJob }: JobCardProps) {
  const [isSaved, setIsSaved] = useState(false);
  const router = useRouter();

  return (
    <div
      className={cn(
        "group bg-background p-6 hover:bg-hover transition-colors duration-200 cursor-pointer border-b border-[#333]",
        index === 0 ? "border-t" : ""
      )}
      onClick={() => router.push(`/freelancer/jobs/${job.id}`)}
    >
      <div className="flex justify-between items-start">
        <div className="text-sm text-gray-500">
          Posted {formatRelativeTime(job.createdAt)}
        </div>
        <div className="flex space-x-1">
          <button className="p-1 rounded">
            <ThumbsDown />
          </button>
          <button
            className="p-1 rounded"
            onClick={() => {
              setIsSaved(!isSaved);
              onSaveJob(job.id);
            }}
          >
            <Heart className={cn(isSaved ? "text-red-500 fill-red-500" : "")} />
          </button>
        </div>
      </div>

      <h3 className="text-xl font-medium text-foreground mb-1 hover:underline group-hover:text-green-600">
        {job.title}
      </h3>

      <div className="text-sm text-gray-400 mb-4">
        {job.jobType === "HOURLY" ? "Hourly" : "Fixed-price"} -{" "}
        {job.experienceLevel} - {job.jobDuration}
      </div>

      <p className="line-clamp-3">{job.description}</p>

      <div className="mb-4">
        <p className="text-green-600 text-underline text-sm cursor-pointer">
          more
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {job.skills?.map((skill) => (
          <span
            key={skill.id}
            className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm"
          >
            {skill.name}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
        {/* {job.paymentVerified && (
          <div className="flex items-center">
            <CheckCircle className="h-4 w-4 text-green-600 mr-1" />
            <span>Payment verified</span>
          </div>
        )} */}

        {/* {job.rating && (
          <div className="flex items-center">
            <div className="flex mr-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-4 h-4 text-yellow-400 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
            </div>
            <span>{job.spent}</span>
          </div>
        )}

        <div className="flex items-center">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{job.location}</span>
        </div> */}
      </div>

      {/* <div className="mt-4 text-sm text-gray-600">
        Proposals: {job.proposals}
      </div> */}
    </div>
  );
}
