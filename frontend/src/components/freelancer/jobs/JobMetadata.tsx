import React from "react";

interface JobMetaDataProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

export const JobMetaData = ({ icon, label, value }: JobMetaDataProps) => (
  <div className="flex items-center gap-2 text-gray-600">
    <span className="text-indigo-600">{icon}</span>
    <span className="font-medium">{label}:</span>
    <span>{value}</span>
  </div>
);
