export type WorkSubmissionProps = {
  id: string;
  title: string;
  description: string;
  fileUrl: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  reviewedAt?: string;
  workLogId: string;
};

export type CreateWorkSubmissionProps = {
  title: string;
  description: string;
  fileUrl: string;
  workLogId: string;
};
