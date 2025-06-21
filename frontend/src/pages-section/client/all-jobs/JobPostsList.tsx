import { JobProps } from "@/types/jobs";
import { JobPostCard } from "./components/JobPostCard";

export function JobPostsList({ jobPosts }: { jobPosts: JobProps[] }) {
  return (
    <div className="space-y-4 my-8">
      {jobPosts.map((jobPost, index) => (
        <JobPostCard
          key={index}
          title={jobPost.title}
          createdTime={jobPost.createdAt}
        />
      ))}
    </div>
  );
}
