import type React from "react";
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function FeatureCard({
  icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <div className="flex gap-3">
      <div className="text-green-600 mt-1">{icon}</div>
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      </div>
    </div>
  );
}
