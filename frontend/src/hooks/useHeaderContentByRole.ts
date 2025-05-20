import {
  clientNavHeader,
  freelancerNavHeader,
  clientAvatarMenu,
  freelancerAvatarMenu,
} from "@/constants/menu";
import { useUserStore } from "@/lib/store";

export const useHeaderContentByRole = () => {
  const { role } = useUserStore();

  switch (role) {
    case "client":
      return { navHeader: clientNavHeader, avatarMenu: clientAvatarMenu };
    case "freelancer":
      return {
        navHeader: freelancerNavHeader,
        avatarMenu: freelancerAvatarMenu,
      };
    default:
      return { navHeader: [], avatarMenu: [] };
  }
};
