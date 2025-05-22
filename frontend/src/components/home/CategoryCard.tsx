import Link from "next/link";

interface CategoryCardProps {
  title: string;
  jobCount: string;
  hourlyRate: string;
}

export default function CategoryCard({
  title,
  jobCount,
  hourlyRate,
}: CategoryCardProps) {
  return (
    <div className="border-b pb-4">
      <Link href="#" className="font-medium hover:text-green-600">
        {title}
      </Link>
      <div className="flex text-sm text-gray-500 mt-1 space-x-4">
        <span>{jobCount}</span>
        <span>{hourlyRate}</span>
      </div>
    </div>
  );
}
