import React from "react";

interface AspectRatioProps {
  ratio?: number;
  children: React.ReactNode;
  className?: string;
}

export function AspectRatio({
  ratio = 1,
  children,
  className = "",
}: AspectRatioProps) {
  return (
    <div
      className={`relative w-full ${className}`}
      style={{
        paddingBottom: `${(1 / ratio) * 100}%`,
      }}
    >
      <div className="absolute inset-0">{children}</div>
    </div>
  );
}
