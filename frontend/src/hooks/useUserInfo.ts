import { useQuery } from "@tanstack/react-query";
import {
  getUserById,
  getUserEducation,
  getUserLanguages,
} from "@/services/userService";
import { EducationData, LanguageData } from "@/types/modals";

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

export const useUserEducation = (userId: string) => {
  return useQuery<EducationData[]>({
    queryKey: ["userEducation", userId],
    queryFn: () => getUserEducation(userId),
  });
};
