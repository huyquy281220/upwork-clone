import React from "react";

export default function Copyright() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="text-gray-500 text-sm mt-8 pt-8 border-t border-gray-800">
      © 2015 - {currentYear} Upwork® Global Inc.
    </div>
  );
}
