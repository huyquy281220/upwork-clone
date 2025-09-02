export const NotificationRedirectMap: Record<
  string,
  (data: { id: string }) => string
> = {
  APPLY_JOB: ({ id }) => `/client/job/${id}`,
  CREATE_CONTRACT: ({ id }) => `freelancer/contract/${id}`,
  REJECT_PROPOSAL: ({ id }) => `/freelancer/jobs/${id}`,
  WORK_SUBMISSION: ({ id }) => `/client/contracts/${id}`,
};
