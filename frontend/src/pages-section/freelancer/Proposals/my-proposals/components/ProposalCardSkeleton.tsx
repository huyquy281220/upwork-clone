"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ProposalCardSkeleton() {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            {/* Title and badges */}
            <div className="flex items-center space-x-2 mb-2">
              <Skeleton className="h-6 w-80" />
              <Skeleton className="h-5 w-16" />
            </div>

            {/* Submission details */}
            <div className="flex items-center space-x-4 text-sm mb-3">
              <div className="flex items-center space-x-1">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-24" />
              </div>
              <div className="flex items-center space-x-1">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-20" />
              </div>
              <Skeleton className="h-4 w-16" />
            </div>

            {/* Client info */}
            <div className="flex items-center space-x-3 mb-4">
              <Skeleton className="h-8 w-8 rounded-full" />
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-12" />
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    <Skeleton className="h-3 w-3" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                  <div className="flex items-center space-x-1">
                    <Skeleton className="h-3 w-3" />
                    <Skeleton className="h-3 w-8" />
                  </div>
                  <Skeleton className="h-3 w-12" />
                </div>
              </div>
            </div>

            {/* Cover letter preview */}
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </div>

            {/* Status and actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-4 w-24" />
                <div className="flex items-center space-x-1">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-12" />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-8" />
                <Skeleton className="h-8 w-8" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
