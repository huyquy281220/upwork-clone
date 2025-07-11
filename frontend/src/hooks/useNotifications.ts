import {
  getNotificationsByUserId,
  markNotificationAsRead,
} from "@/services/notifications";
import { NotificationProps } from "@/types/notification";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Socket } from "socket.io-client";

type NotificationsProps = {
  socket: Socket;
  userId: string;
};

export const useNotifications = ({ socket, userId }: NotificationsProps) => {
  const queryClient = useQueryClient();

  const { data: notifications = [], refetch } = useQuery<NotificationProps[]>({
    queryKey: ["notifications", userId],
    queryFn: () => getNotificationsByUserId(userId),
    enabled: !!userId,
    staleTime: 1000 * 60,
  });

  // ✅ Listen real-time notification
  useEffect(() => {
    if (!socket || !userId) return;

    const handleNotification = (newNotification: NotificationProps) => {
      console.log("New notification:", newNotification);

      // ✅ Optimistically update React Query cache
      queryClient.setQueryData(
        ["notifications", userId],
        (old: NotificationProps[]) => [newNotification, ...(old || [])]
      );
    };

    socket.on("new_notification", handleNotification);

    return () => {
      socket.off("new_notification", handleNotification);
    };
  }, [socket, userId, queryClient]);

  const markAsReadMutation = useMutation({
    mutationFn: (notificationId: string) =>
      markNotificationAsRead(notificationId, userId),
    onSuccess: () => {
      // Refetch or update cache after mutation
      queryClient.invalidateQueries({ queryKey: ["notifications", userId] });
    },
  });

  return { notifications, refetch, markAsRead: markAsReadMutation.mutate };
};
