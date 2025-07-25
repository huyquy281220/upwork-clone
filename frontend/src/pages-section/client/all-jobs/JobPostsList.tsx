import { JobProps } from "@/types/jobs";
import { JobPostCard } from "./components/JobPostCard";
import { JobSummarySkeleton } from "./components/JobSummarySkeleton";

export function JobPostsList({
  jobPosts,
  currentPage,
  isLoading,
}: {
  jobPosts: JobProps[];
  currentPage: number;
  isLoading: boolean;
}) {
  if (isLoading) {
    return <JobSummarySkeleton />;
  }

  return (
    <div className="space-y-4 my-8">
      {jobPosts.map((jobPost, index) => (
        <JobPostCard
          key={index}
          title={jobPost.title}
          createdTime={jobPost.createdAt}
          jobId={jobPost.id}
          currentPage={currentPage}
        />
      ))}
    </div>
  );
}
