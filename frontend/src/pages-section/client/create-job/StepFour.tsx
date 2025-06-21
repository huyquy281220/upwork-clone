"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Clock, DollarSign } from "lucide-react";
import { useJobPostingContext } from "@/store/JobPostingContext";
import { JobType } from "@/types/jobs";

export default function Step4Budget() {
  const { jobData, updateJobData } = useJobPostingContext();

  return (
    <div className="grid grid-cols-2 gap-12  mx-auto">
      <div>
        <div className="text-sm text-gray-400 mb-2">4/5 Job post</div>
        <h1 className="text-4xl font-bold text-white mb-6">
          Tell us about your budget.
        </h1>
        <p className="text-gray-300">
          This will help us match you to talent within your range.
        </p>
      </div>
      <div>
        {/* Budget Type Selection */}
        <div className="flex gap-4 mb-8">
          <Card
            className={`flex-1 cursor-pointer transition-all ${
              jobData.jobType === JobType.HOURLY
                ? "bg-gray-700 border-green-500"
                : "bg-gray-800 border-gray-600 hover:border-gray-500"
            }`}
            onClick={() => updateJobData({ jobType: JobType.HOURLY })}
          >
            <CardContent className="p-6 flex items-center">
              <Clock className="w-6 h-6 text-green-400 mr-3" />
              <div>
                <div className="text-white font-semibold">Hourly rate</div>
                {jobData.jobType === JobType.HOURLY && (
                  <div className="w-3 h-3 bg-green-400 rounded-full mt-2"></div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card
            className={`flex-1 cursor-pointer transition-all ${
              jobData.jobType === JobType.FIXED_PRICE
                ? "bg-gray-700 border-green-500"
                : "bg-gray-800 border-gray-600 hover:border-gray-500"
            }`}
            onClick={() => updateJobData({ jobType: JobType.FIXED_PRICE })}
          >
            <CardContent className="p-6 flex items-center">
              <DollarSign className="w-6 h-6 text-white mr-3" />
              <div>
                <div className="text-white font-semibold">Fixed price</div>
                {jobData.jobType === JobType.FIXED_PRICE && (
                  <div className="w-3 h-3 bg-green-400 rounded-full mt-2"></div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Hourly Rate */}
        {jobData.jobType === JobType.HOURLY && (
          <div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-white block mb-2">From</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white">
                    $
                  </span>
                  <input
                    value={jobData.hourlyRateMin}
                    onChange={(e) =>
                      updateJobData({ hourlyRateMin: Number(e.target.value) })
                    }
                    className="bg-gray-800 border-gray-600 text-white pl-8"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    /hr
                  </span>
                </div>
              </div>
              <div>
                <label className="text-white block mb-2">To</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white">
                    $
                  </span>
                  <input
                    value={jobData.hourlyRateMax}
                    onChange={(e) =>
                      updateJobData({ hourlyRateMax: Number(e.target.value) })
                    }
                    className="bg-gray-800 border-gray-600 text-white pl-8"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    /hr
                  </span>
                </div>
              </div>
            </div>

            <p className="text-gray-400 text-sm mb-4">
              This is the average rate for similar projects.
            </p>

            <p className="text-gray-400 text-sm mb-6">
              Professionals tend to charge{" "}
              <span className="text-white font-semibold">$15 - $26</span> /hour
              (USD) for general translation services projects like yours.
              Experts may charge higher rates.
            </p>

            {/* Rate Distribution Chart Placeholder */}
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="h-32 flex items-end justify-center space-x-1">
                {[2, 4, 6, 8, 12, 16, 14, 10, 6, 4, 2].map((height, index) => (
                  <div
                    key={index}
                    className={`w-8 ${
                      index >= 4 && index <= 7 ? "bg-green-500" : "bg-gray-600"
                    }`}
                    style={{ height: `${height * 4}px` }}
                  ></div>
                ))}
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-2">
                <span>5</span>
                <span>21</span>
                <span>38</span>
                <span>54</span>
                <span>70</span>
              </div>
              <div className="text-center text-xs text-gray-400 mt-1">
                hourly rate (USD)
              </div>
            </div>
          </div>
        )}

        {/* Fixed Price */}
        {jobData.jobType === JobType.FIXED_PRICE && (
          <div>
            <p className="text-gray-300 mb-6">
              Set a price for the project and pay at the end, or you can divide
              the project into milestones and pay as each milestone is
              completed.
            </p>

            <label className="text-white font-semibold block mb-2">
              What is the best cost estimate for your project?
            </label>
            <p className="text-gray-400 text-sm mb-4">
              You can negotiate this cost and create milestones when you chat
              with your freelancer.
            </p>

            <div className="relative mb-4">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white">
                $
              </span>
              <input
                value={jobData.fixedPrice}
                onChange={(e) =>
                  updateJobData({ fixedPrice: Number(e.target.value) })
                }
                className="bg-gray-800 border-gray-600 text-white pl-8 text-center text-lg py-3"
              />
            </div>

            <button className="text-green-400 text-sm">
              Not ready to set a budget?
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
