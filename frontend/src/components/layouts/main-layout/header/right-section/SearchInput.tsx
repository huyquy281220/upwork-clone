"use client";

import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { searchCategories } from "../data/navigation";
import { getDynamicIcon } from "@/utils/getDynamicIcon";
import { useDebounce } from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";

export default function SearchInput() {
  const router = useRouter();
  const [isJobsOpen, setIsJobsOpen] = useState(false);
  const [searchType, setSearchType] = useState("jobs");
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const handleSearch = () => {
    switch (searchType) {
      case "jobs":
        console.log("jobs");
        router.push(`/search/jobs?query=${debouncedSearchQuery}`);
        break;
      case "talent":
        console.log("talent");
        router.push(`/search/talent?query=${debouncedSearchQuery}`);
        break;
      case "projects":
        console.log("projects");
        router.push(`/search/projects?query=${debouncedSearchQuery}`);
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex items-center space-x-2 py-1 border border-gray-700 rounded-md">
      {/* Search Input */}
      <div className="relative">
        <div className="bg-background flex items-center rounded-md px-2 py-1.5">
          <Search className="h-4 w-4 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent  text-sm w-52 focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
        </div>
      </div>

      <div className="w-[1px] h-8 bg-gray-700" />

      {/* Jobs Dropdown */}
      <Popover open={isJobsOpen} onOpenChange={setIsJobsOpen}>
        <PopoverTrigger asChild>
          <button className="flex items-center space-x-1 bg-transparent py-1.5 px-3 rounded-md ">
            <span className="text-sm font-medium">Jobs</span>
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </button>
        </PopoverTrigger>
        <PopoverContent
          className="w-80 p-0 border-none shadow-menu bg-background overflow-hidden"
          align="end"
          sideOffset={15}
        >
          <div>
            {searchCategories.map((category) => (
              <div
                key={category.id}
                className="flex items-start px-4 py-3 hover:bg-hover"
                onClick={() => setSearchType(category.id)}
              >
                <div className="mr-3 mt-1 text-gray-300">
                  {getDynamicIcon(category.iconName)}
                </div>
                <div>
                  <h3 className="font-medium ">{category.title}</h3>
                  <p className="text-sm text-gray-400">
                    {category.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
