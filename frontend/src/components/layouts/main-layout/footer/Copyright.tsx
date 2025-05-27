"use client";

import React from "react";

export default function Copyright() {
  return (
    <div className="text-gray-500 text-sm mt-8 pt-8 border-t border-gray-800">
      © 2015 - {new Date().getFullYear()} Upwork® Global Inc.
    </div>
  );
}
