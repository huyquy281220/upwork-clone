export type WorkSubmissionProps = {
  id: string;
  title: string;
  description: string;
  fileUrl: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  reviewedAt?: string;
  contractId: string;
};

export type CreateWorkSubmissionProps = {
  title: string;
  description: string;
  fileUrl: string;
  contractId: string;
};

export type UpdateWorkSubmissionProps = {
  title?: string;
  description?: string;
  fileUrl?: string;
  status?: string;
};
