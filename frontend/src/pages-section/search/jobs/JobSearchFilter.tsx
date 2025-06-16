"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FilterSection } from "../components/FilterSection";
import { Checkbox } from "@/components/ui/checkbox";

export function JobSearchFilters() {
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    category: true,
    experience: true,
    jobType: true,
    fixedPrice: true,
    proposals: true,
    projectLength: true,
    hoursPerWeek: true,
    duration: true,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="space-y-4">
      {/* Category */}
      <FilterSection
        title="Category"
        isExpanded={expandedSections.category}
        onToggle={() => toggleSection("category")}
      >
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="web-development">Web Development</SelectItem>
            <SelectItem value="mobile-development">
              Mobile Development
            </SelectItem>
            <SelectItem value="design">Design</SelectItem>
          </SelectContent>
        </Select>
      </FilterSection>

      {/* Experience Level */}
      <FilterSection
        title="Experience level"
        isExpanded={expandedSections.experience}
        onToggle={() => toggleSection("experience")}
      >
        <div className="space-y-3">
          {[
            { label: "Entry Level", count: 2847 },
            { label: "Intermediate", count: 4445 },
            { label: "Expert", count: 1829 },
          ].map((item) => (
            <div key={item.label} className="flex items-center space-x-2">
              <Checkbox id={item.label.toLowerCase().replace(" ", "-")} />
              <label
                htmlFor={item.label.toLowerCase().replace(" ", "-")}
                className="text-sm text-foreground cursor-pointer"
              >
                {item.label} ({item.count.toLocaleString()})
              </label>
            </div>
          ))}
        </div>
      </FilterSection>

      {/* Job Type */}
      <FilterSection
        title="Job type"
        isExpanded={expandedSections.jobType}
        onToggle={() => toggleSection("jobType")}
      >
        <div className="space-y-3">
          {[
            { label: "Hourly", count: 6543 },
            { label: "Fixed-Price", count: 2578 },
          ].map((item) => (
            <div key={item.label} className="flex items-center space-x-2">
              <Checkbox id={item.label.toLowerCase().replace("-", "")} />
              <label
                htmlFor={item.label.toLowerCase().replace("-", "")}
                className="text-sm text-foreground cursor-pointer"
              >
                {item.label} ({item.count.toLocaleString()})
              </label>
            </div>
          ))}
        </div>
      </FilterSection>

      {/* Fixed Price */}
      <FilterSection
        title="Fixed-Price"
        isExpanded={expandedSections.fixedPrice}
        onToggle={() => toggleSection("fixedPrice")}
      >
        <div className="space-y-3">
          {[
            { label: "$100 to $500", count: 1234 },
            { label: "$500 to $1K", count: 987 },
            { label: "$1K to $5K", count: 654 },
            { label: "$5K+", count: 321 },
          ].map((item) => (
            <div key={item.label} className="flex items-center space-x-2">
              <Checkbox id={item.label.replace(/[$\s]/g, "").toLowerCase()} />
              <label
                htmlFor={item.label.replace(/[$\s]/g, "").toLowerCase()}
                className="text-sm text-foreground cursor-pointer"
              >
                {item.label} ({item.count.toLocaleString()})
              </label>
            </div>
          ))}
        </div>
      </FilterSection>

      {/* Number of proposals */}
      <FilterSection
        title="Number of proposals"
        isExpanded={expandedSections.proposals}
        onToggle={() => toggleSection("proposals")}
      >
        <div className="space-y-3">
          {[
            { label: "Less than 5", count: 1567 },
            { label: "5 to 10", count: 2345 },
            { label: "10 to 15", count: 1234 },
            { label: "15 to 20", count: 876 },
            { label: "20 to 50", count: 543 },
          ].map((item) => (
            <div key={item.label} className="flex items-center space-x-2">
              <Checkbox id={item.label.replace(/\s/g, "").toLowerCase()} />
              <label
                htmlFor={item.label.replace(/\s/g, "").toLowerCase()}
                className="text-sm text-foreground cursor-pointer"
              >
                {item.label} ({item.count.toLocaleString()})
              </label>
            </div>
          ))}
        </div>
      </FilterSection>

      {/* Project length */}
      <FilterSection
        title="Project length"
        isExpanded={expandedSections.projectLength}
        onToggle={() => toggleSection("projectLength")}
      >
        <div className="space-y-3">
          {[
            { label: "Less than one month", count: 1234 },
            { label: "1 to 3 months", count: 2345 },
            { label: "3 to 6 months", count: 1567 },
            { label: "More than 6 months", count: 987 },
          ].map((item) => (
            <div key={item.label} className="flex items-center space-x-2">
              <Checkbox id={item.label.replace(/\s/g, "").toLowerCase()} />
              <label
                htmlFor={item.label.replace(/\s/g, "").toLowerCase()}
                className="text-sm text-foreground cursor-pointer"
              >
                {item.label} ({item.count.toLocaleString()})
              </label>
            </div>
          ))}
        </div>
      </FilterSection>

      {/* Hours per week */}
      <FilterSection
        title="Hours per week"
        isExpanded={expandedSections.hoursPerWeek}
        onToggle={() => toggleSection("hoursPerWeek")}
      >
        <div className="space-y-3">
          {[
            { label: "Less than 30 hrs/week", count: 3456 },
            { label: "More than 30 hrs/week", count: 2345 },
          ].map((item) => (
            <div key={item.label} className="flex items-center space-x-2">
              <Checkbox id={item.label.replace(/[\s/]/g, "").toLowerCase()} />
              <label
                htmlFor={item.label.replace(/[\s/]/g, "").toLowerCase()}
                className="text-sm text-foreground cursor-pointer"
              >
                {item.label} ({item.count.toLocaleString()})
              </label>
            </div>
          ))}
        </div>
      </FilterSection>

      {/* Job duration */}
      <FilterSection
        title="Job duration"
        isExpanded={expandedSections.duration}
        onToggle={() => toggleSection("duration")}
      >
        <div className="space-y-3">
          {[{ label: "Contract-to-hire roles", count: 1234 }].map((item) => (
            <div key={item.label} className="flex items-center space-x-2">
              <Checkbox id={item.label.replace(/[\s-]/g, "").toLowerCase()} />
              <label
                htmlFor={item.label.replace(/[\s-]/g, "").toLowerCase()}
                className="text-sm text-foreground cursor-pointer"
              >
                {item.label} ({item.count.toLocaleString()})
              </label>
            </div>
          ))}
        </div>
      </FilterSection>
    </div>
  );
}
