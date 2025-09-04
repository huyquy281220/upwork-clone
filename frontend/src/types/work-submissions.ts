export enum WorkSubmissionStatus {
  PENDING = "PENDING",
  SUBMITTED = "SUBMITTED",
  REJECTED = "REJECTED",
}

export type WorkSubmissionProps = {
  id: string;
  title: string;
  description: string;
  fileUrl: string;
  fileName: string;
  fileSize: number;
  fileKey: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  reviewedAt?: string;
  contractId: string;
  amount?: number;
};

export type CreateWorkSubmissionProps = {
  title: string;
  description: string;
  file: File;
  contractId: string;
  workLogId?: string;
  milestoneId?: string;
};

export type UpdateWorkSubmissionProps = {
  title?: string;
  description?: string;
  file?: File;
  status?: string;
};
