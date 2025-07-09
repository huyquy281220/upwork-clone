enum NotificationType {
  APPLY_JOB = "APPLY_JOB",
  CREATE_CONTRACT = "CREATE_CONTRACT",
}

export interface NotificationProps {
  userId: string;
  id: string;
  content: string;
  isRead: boolean;
  createdAt: string;
  type: NotificationType;
  user: {
    fullName: string;
    email: string;
  };
}
