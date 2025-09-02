enum NotificationType {
  APPLY_JOB = "APPLY_JOB",
  CREATE_CONTRACT = "CREATE_CONTRACT",
  WORK_SUBMISSION = "WORK_SUBMISSION",
}

export interface NotificationProps {
  userId: string;
  id: string;
  content: string;
  isRead: boolean;
  createdAt: string;
  type: NotificationType;
  itemId?: string;
  user: {
    fullName: string;
    email: string;
  };
}
