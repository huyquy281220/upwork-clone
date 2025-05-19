"use client";

import { useRef, useEffect, useState } from "react";
import React from "react";

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
