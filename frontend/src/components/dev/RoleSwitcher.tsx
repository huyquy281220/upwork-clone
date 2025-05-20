"use client";

import { useUser } from "@/contexts/UserContext";

export default function RoleSwitcher() {
  const { userRole, setUserRole } = useUser();

  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 p-3 rounded-lg z-50  shadow-lg">
      <div className="text-sm mb-2 font-medium">Current View:</div>
      <select
        value={userRole}
        onChange={(e) => setUserRole(e.target.value as "client" | "freelancer")}
        className="bg-gray-700  p-2 rounded text-sm border border-gray-600 w-full"
      >
        <option value="freelancer">Freelancer</option>
        <option value="client">Client</option>
      </select>
    </div>
  );
}
