"use client";

import { useRef, useEffect, useState } from "react";
import React from "react";
import { ChevronDown } from "lucide-react";

export default function AnimatedDropdown({
  children,
  isOpen,
}: {
  children: React.ReactNode;
  isOpen: boolean;
}) {
  const [height, setHeight] = useState<number | undefined>(undefined);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && ref.current) {
      const contentHeight = ref.current.scrollHeight;
      setHeight(contentHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen, children]);

  return (
    <div
      ref={ref}
      style={{
        maxHeight: height !== undefined ? height : undefined,
        overflow: "hidden",
        transition: "max-height 0.3s ease-in-out",
      }}
      aria-hidden={!isOpen}
    >
      {children}
    </div>
  );
}

export interface DropdownItemProps {
  title: string;
  isExpanded?: boolean;
  isDropdown?: boolean;
  onClick?: () => void;
}

export const DropdownItem = ({
  title,
  isExpanded = false,
  isDropdown = true,
  onClick,
}: DropdownItemProps) => {
  if (!isDropdown) {
    return (
      <div className="flex items-center justify-between px-4 py-3 cursor-pointer">
        <span className={""}>{title}</span>
      </div>
    );
  }
  return (
    <div
      className="flex items-center justify-between px-4 py-3 cursor-pointer"
      onClick={onClick}
    >
      <span className={""}>{title}</span>

      <ChevronDown
        size={18}
        className={`transition-transform duration-200 ${
          isExpanded ? "rotate-180" : ""
        }`}
      />
    </div>
  );
};
