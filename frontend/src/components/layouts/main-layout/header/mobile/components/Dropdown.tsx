"use client";

import { useRef, useEffect, useState } from "react";

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
