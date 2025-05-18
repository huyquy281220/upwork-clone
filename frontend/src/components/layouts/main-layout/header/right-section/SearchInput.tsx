"use client";

import { useState } from "react";
import { Search, ChevronDown, Briefcase, Users, FileText } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";

type JobMenuCategory = {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
};

export const SearchInput = () => {
  const [isJobsOpen, setIsJobsOpen] = useState(false);

  const jobMenuCategories: JobMenuCategory[] = [
    {
      icon: <Briefcase className="h-5 w-5" />,
      title: "Jobs",
      description: "Apply to jobs posted by clients",
      href: "/jobs",
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: "Talent",
      description: "Find freelancers and agencies",
      href: "/talent",
    },
    {
      icon: <FileText className="h-5 w-5" />,
      title: "Projects",
      description: "See projects from other pros",
      href: "/projects",
    },
  ];

  return (
    <div className="flex items-center space-x-2 py-1 border border-gray-700 rounded-md">
      {/* Search Input */}
      <div className="relative">
        <div className="bg-main flex items-center rounded-md px-2 py-1.5">
          <Search className="h-4 w-4 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent text-white text-sm w-52 focus:outline-none"
          />
        </div>
      </div>

      <div className="w-[1px] h-8 bg-gray-700" />

      {/* Jobs Dropdown */}
      <Popover open={isJobsOpen} onOpenChange={setIsJobsOpen}>
        <PopoverTrigger asChild>
          <button className="flex items-center space-x-1 bg-transparent py-1.5 px-3 rounded-md text-white">
            <span className="text-sm font-medium">Jobs</span>
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </button>
        </PopoverTrigger>
        <PopoverContent
          className="w-80 p-0 border-none shadow-menu bg-main text-white"
          align="end"
          sideOffset={5}
        >
          <div className="py-2">
            {jobMenuCategories.map((category) => (
              <Link
                key={category.title}
                href={category.href}
                className="flex items-start px-4 py-3 hover:bg-gray-800"
              >
                <div className="mr-3 mt-1 text-gray-300">{category.icon}</div>
                <div>
                  <h3 className="font-medium text-white">{category.title}</h3>
                  <p className="text-sm text-gray-400">
                    {category.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
