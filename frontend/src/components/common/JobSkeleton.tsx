export default function JobSkeleton() {
  return (
    <div className="p-6 rounded-lg max-w-4xl mx-auto">
      <div className="flex items-center space-x-4 mb-6">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-64" />
      </div>

      <div className="space-y-4">
        <Skeleton className="h-3 w-full" />

        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />

        <Skeleton className="h-3 w-1/3" />
      </div>

      <div className="flex space-x-3 mt-6 mb-6">
        <Skeleton className="h-8 w-16 rounded-full" />
        <Skeleton className="h-8 w-16 rounded-full" />
        <Skeleton className="h-8 w-16 rounded-full" />
      </div>

      <Skeleton className="h-3 w-80" />
    </div>
  );
}

const Skeleton = ({ className = "", ...props }) => {
  return (
    <div
      className={`animate-pulse rounded-md bg-gray-300 dark:bg-gray-700 ${className}`}
      {...props}
    />
  );
};
