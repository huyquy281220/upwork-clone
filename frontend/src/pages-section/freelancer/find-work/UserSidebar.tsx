"use client";

import type React from "react";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { ChevronDown, ChevronUp, Edit2, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUser } from "@/hooks/useUserInfo";
import { useSession } from "next-auth/react";
import JobSkeleton from "@/components/common/JobSkeleton";
import { FreelancerProps } from "@/types/user";

export function UserSidebar() {
  const { data: session } = useSession();
  const { data: user, isLoading } = useUser<FreelancerProps>(
    session?.user.id ?? ""
  );

  const [showPromoteAds, setShowPromoteAds] = useState(false);
  const [showConnects, setShowConnects] = useState(false);
  const [showProposals, setShowProposals] = useState(false);
  const [showProjectCatalog, setShowProjectCatalog] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);

  const toggleSection = (
    setter: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    return () => setter((prev) => !prev);
  };

  if (isLoading) return <JobSkeleton />;

  return (
    <div className="space-y-4 hidden md:block">
      <Card className="p-4 bg-background">
        <div className="text-center mb-4">
          <Avatar className="w-16 h-16 mx-auto mb-2">
            <AvatarImage src="/placeholder.svg?height=64&width=64" />
            <AvatarFallback className="bg-gray-200 text-gray-600 font-semibold">
              HH
            </AvatarFallback>
          </Avatar>
          <h3 className="font-semibold">{user?.fullName}</h3>
          <p className="text-sm text-gray-600">{user?.title}</p>
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <a
              href="#"
              className="text-sm font-medium text-green-600 underline"
            >
              Complete your profile
            </a>
            <span className="text-sm text-gray-900">40%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-600 h-2 rounded-full"
              style={{ width: "40%" }}
            ></div>
          </div>
        </div>

        <div className="bg-subBackground rounded-md p-4 mb-3">
          <button
            onClick={toggleSection(setShowPromoteAds)}
            className="flex justify-between items-center w-full"
          >
            <h4 className="font-medium">Promote with ads</h4>
            {showPromoteAds ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </button>

          <div
            className={cn(
              "mt-3 space-y-3 overflow-hidden transition-all duration-300 ease-in-out",
              showPromoteAds ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
            )}
          >
            <div className="flex justify-between items-center">
              <span>Availability badge</span>
              <div className="flex items-center">
                <span className="text-gray-500 mr-2">Off</span>
                <Edit2 className="h-4 w-4" />
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span>Boost your profile</span>
              <div className="flex items-center">
                <span className="text-gray-500 mr-2">Off</span>
                <Edit2 className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-subBackground rounded-md p-4 mb-3">
          <button
            onClick={toggleSection(setShowConnects)}
            className="flex justify-between items-center w-full"
          >
            <h4 className="font-medium">Connects: 0</h4>
            {showConnects ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </button>

          <div
            className={cn(
              "mt-3 overflow-hidden transition-all duration-300 ease-in-out",
              showConnects ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
            )}
          >
            <div className="flex items-center">
              <a href="#" className="text-green-600 font-medium">
                View details
              </a>
              <span className="mx-2 text-gray-400">|</span>
              <a href="#" className="text-green-600 font-medium">
                Buy Connects
              </a>
            </div>
          </div>
        </div>

        <div className="bg-subBackground rounded-md p-4 mb-3">
          <button
            onClick={toggleSection(setShowProposals)}
            className="flex justify-between items-center w-full"
          >
            <h4 className="font-medium">Proposals</h4>
            {showProposals ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </button>

          <div
            className={cn(
              "mt-3 space-y-3 overflow-hidden transition-all duration-300 ease-in-out",
              showProposals ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
            )}
          >
            <a href="#" className="text-green-600 font-medium block">
              My Proposals
            </a>
            <p className="text-sm text-foreground">
              Looking for work? Browse jobs and get started on a proposal.
            </p>
          </div>
        </div>

        <div className="bg-subBackground rounded-md p-4 mb-3">
          <button
            onClick={toggleSection(setShowProjectCatalog)}
            className="flex justify-between items-center w-full"
          >
            <h4 className="font-medium">Project Catalog</h4>
            {showProjectCatalog ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </button>

          <div
            className={cn(
              "mt-3 space-y-3 overflow-hidden transition-all duration-300 ease-in-out",
              showProjectCatalog ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
            )}
          >
            <a href="#" className="text-green-600 font-medium block">
              My Project Dashboard
            </a>
            <div className="flex items-start">
              <a href="#" className="text-green-600 font-medium">
                Create a Catalog project
              </a>
              <span className="text-sm text-foreground ml-1">
                for clients to purchase instantly
              </span>
            </div>
          </div>
        </div>

        <div className="bg-subBackground rounded-md p-4">
          <button
            onClick={toggleSection(setShowPreferences)}
            className="flex justify-between items-center w-full"
          >
            <h4 className="font-medium">Preferences</h4>
            {showPreferences ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </button>

          <div
            className={cn(
              "mt-3 space-y-4 overflow-hidden transition-all duration-300 ease-in-out",
              showPreferences ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            )}
          >
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="font-medium">Hours per week</span>
                <Edit2 className="h-4 w-4" />
              </div>
              <p className="text-sm text-foreground">More than 30 hrs/week</p>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="font-medium">Profile Visibility</span>
                <Edit2 className="h-4 w-4" />
              </div>
              <p className="text-sm text-foreground">Public</p>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="font-medium">Job Preference</span>
                <Edit2 className="h-4 w-4" />
              </div>
              <p className="text-sm text-foreground">No preference set</p>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="font-medium">My Categories</span>
                <Edit2 className="h-4 w-4" />
              </div>
              <a href="#" className="text-green-600 text-sm">
                Web Development
              </a>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-4 bg-subBackground">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <a href="#" className="font-medium hover:underline">
              Direct Contracts
            </a>
            <ExternalLink className="h-4 w-4 text-gray-500" />
          </div>
          <div className="flex justify-between items-center">
            <a href="#" className="font-medium hover:underline">
              Get Paid
            </a>
            <ExternalLink className="h-4 w-4 text-gray-500" />
          </div>
          <div className="flex justify-between items-center">
            <a href="#" className="font-medium hover:underline">
              Help Center
            </a>
            <ExternalLink className="h-4 w-4 text-gray-500" />
          </div>
        </div>
      </Card>
    </div>
  );
}
