"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { setCookie, getCookie } from "@/lib/cookie";

export default function Loading() {
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();
  const currentRole = getCookie("role");

  useEffect(() => {
    if (session?.user) {
      setCookie("role", session.user.role);
      setCookie("accessToken", session.user.accessToken);
      setIsLoading(false);
    }
  }, [session]);

  if (isLoading === false) {
    switch (currentRole) {
      case "CLIENT":
        redirect("/client");
      case "FREELANCER":
        redirect("/freelancer/find-work");
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center space-y-6">
        {/* Upwork Logo */}
        <div className="flex items-center justify-center space-x-3 mb-8">
          <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">U</span>
          </div>
          <span className="text-2xl font-semibold text-gray-900">Upwork</span>
        </div>

        {/* Loading Spinner */}
        <div className="flex justify-center">
          <Loader2 className="w-8 h-8 text-green-600 animate-spin" />
        </div>

        {/* Loading Text */}
        <p className="text-gray-600 text-sm">Redirecting ...</p>
      </div>
    </div>
  );
}
