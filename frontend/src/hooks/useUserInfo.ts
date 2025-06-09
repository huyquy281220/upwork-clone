import { useQuery } from "@tanstack/react-query";
import { getUserById, getUserLanguages } from "@/services/userService";
import { LanguageData } from "@/types/modals";

export const useUser = <T>(userId: string) => {
  return useQuery<T>({
    queryKey: ["user", userId],
    queryFn: () => getUserById(userId),
    enabled: !!userId,
  });
};

export const useUserLanguages = (userId: string) => {
  return useQuery<LanguageData[]>({
    queryKey: ["userLanguages", userId],
    queryFn: () => getUserLanguages(userId),
  });
};
