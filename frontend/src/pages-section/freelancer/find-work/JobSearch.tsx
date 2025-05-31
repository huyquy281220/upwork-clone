"use client";

import { useState } from "react";
import { Search } from "lucide-react";

export function JobSearch() {
  const [recentSearches] = useState<string[]>(["frontend"]);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative">
      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <Search className="h-5 w-5" />
        </div>
        <input
          type="text"
          placeholder="Search for jobs"
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full text-base focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        />
      </div>

      {isFocused && recentSearches.length > 0 && (
        <div className="absolute w-full bg-background border border-gray-200 rounded-md mt-1 shadow-lg z-10">
          <ul className="py-1">
            {recentSearches.map((search, index) => (
              <li
                key={index}
                className="px-4 py-2  cursor-pointer flex items-center"
              >
                <Search className="h-4 w-4 text-gray-400 mr-2" />
                <span>{search}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
