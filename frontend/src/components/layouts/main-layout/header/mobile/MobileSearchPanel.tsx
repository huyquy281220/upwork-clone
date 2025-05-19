"use client";

import { ChevronLeft, Search } from "lucide-react";
import { useState } from "react";

interface MobileSearchPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileSearchPanel({
  isOpen,
  onClose,
}: MobileSearchPanelProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"Jobs" | "Talent" | "Projects">(
    "Jobs"
  );

  // Example search suggestions
  const searchSuggestions = [
    "youtube video editor",
    "social media manager",
    "chatGPT API integration",
    "shopify developer",
    "email marketing manager",
  ];

  return (
    <div
      className={`fixed inset-y-0 right-0 w-full bg-main text-white z-50 transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
      style={{ maxHeight: "100vh", overflowY: "auto" }}
    >
      {/* Search Header */}
      <div className="flex items-center px-4 py-3 border-b border-gray-700">
        <button
          onClick={onClose}
          className="p-1 mr-2 focus:outline-none"
          aria-label="Back"
        >
          <ChevronLeft size={24} />
        </button>

        <div className="flex-grow relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search size={16} className="text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            className="w-full py-2 pl-10 pr-4 bg-[#2d2d2d] rounded-md focus:outline-none"
          />
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-700">
        {(["Jobs", "Talent", "Projects"] as const).map((tab) => (
          <button
            key={tab}
            className={`flex-1 py-3 text-center ${
              activeTab === tab
                ? "border-b-2 border-white font-medium"
                : "text-gray-400"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search suggestions */}
      <div className="p-4">
        {searchQuery && (
          <div className="mb-4 flex items-center">
            <Search size={16} className="mr-2 text-gray-400" />
            <span>{searchQuery}</span>
          </div>
        )}

        {!searchQuery && (
          <>
            <p className="text-sm text-gray-400 mb-3">Try searching for</p>
            <div className="space-y-3">
              {searchSuggestions.map((suggestion, index) => (
                <div key={index} className="flex items-center">
                  <Search size={16} className="mr-3 text-gray-400" />
                  <span>{suggestion}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
