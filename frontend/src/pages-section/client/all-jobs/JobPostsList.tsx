import { JobProps } from "@/types/jobs";
import { JobPostCard } from "./components/JobPostCard";

export function JobPostsList({
  jobPosts,
  currentPage,
}: {
  jobPosts: JobProps[];
  currentPage: number;
}) {
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
