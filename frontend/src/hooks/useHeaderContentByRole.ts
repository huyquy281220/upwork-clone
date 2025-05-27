import {
  clientNavHeader,
  freelancerNavHeader,
  clientAvatarMenu,
  freelancerAvatarMenu,
} from "@/constants/menu";
import { getCookie } from "@/lib/cookie";
import { useEffect } from "react";
import { useState } from "react";

export const useHeaderContentByRole = () => {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const roleCookie = getCookie("role");
    setRole(roleCookie ?? "");
  }, []);

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
