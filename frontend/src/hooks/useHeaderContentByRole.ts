import {
  clientNavHeader,
  freelancerNavHeader,
  clientAvatarMenu,
  freelancerAvatarMenu,
} from "@/constants/menu";
import { getCookie } from "@/lib/cookie";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useState } from "react";

export const useHeaderContentByRole = () => {
  const { data: session } = useSession();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    // First try to get role from session (after authentication)
    if (session?.user?.role) {
      setRole(session.user.role);
    } else {
      // Fallback to cookie (for role selection during sign-up)
      const roleCookie = getCookie("role");
      setRole(roleCookie ?? "");
    }
  }, [session]);

  switch (role) {
    case "CLIENT":
      return { navHeader: clientNavHeader, avatarMenu: clientAvatarMenu };
    case "FREELANCER":
      return {
        navHeader: freelancerNavHeader,
        avatarMenu: freelancerAvatarMenu,
      };
    default:
      return { navHeader: [], avatarMenu: [] };
  }
};
