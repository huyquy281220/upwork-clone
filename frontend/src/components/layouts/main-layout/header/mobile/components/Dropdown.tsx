"use client";

import { useRef, useEffect, useState } from "react";
import React from "react";

interface AnimatedDropdownProps {
  isOpen: boolean;
  children: React.ReactNode;
  className?: string;
}

export const AnimatedDropdown = ({
  isOpen,
  children,
  className = "",
}: AnimatedDropdownProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>(0);

  useEffect(() => {
    if (isOpen) {
      const contentHeight = contentRef.current?.scrollHeight;
      setHeight(contentHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  return (
    <div
      className={`overflow-hidden transition-all duration-300 ease-in-out ${className}`}
      style={{ height: height ? `${height}px` : "0px" }}
    >
      <div ref={contentRef}>{children}</div>
    </div>
  );
};

export interface DropdownItemProps {
  title: string;
  isHighlighted?: boolean;
  isExpanded?: boolean;
  onClick?: () => void;
}

export const DropdownItem = ({
  title,
  isHighlighted = false,
  isExpanded = false,
  onClick,
}: DropdownItemProps) => (
  <div
    className="flex items-center justify-between px-4 py-3 cursor-pointer"
    onClick={onClick}
  >
    <span className={isHighlighted ? "text-green-500" : "text-white"}>
      {title}
    </span>
    {isExpanded ? <span>&#9650;</span> : <span>&#9660;</span>}
  </div>
);
