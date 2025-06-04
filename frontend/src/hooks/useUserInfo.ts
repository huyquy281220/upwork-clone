import { useQuery } from "@tanstack/react-query";
import { getUserById } from "@/services/userService";

export const useUser = <T>(userId: string) => {
  return useQuery<T>({
    queryKey: ["user", userId],
    queryFn: () => getUserById(userId),
    enabled: !!userId,
  });
};
