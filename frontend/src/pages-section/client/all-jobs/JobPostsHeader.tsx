import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export function JobPostsHeader() {
  return (
    <div className="space-y-6">
      <div className="border-b border-muted-foreground/20">
        <nav className="flex space-x-8">
          <button className="py-3 px-1 border-b-2 font-medium text-sm transition-colors border-foreground text-foreground">
            All job posts
          </button>
        </nav>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-semibold text-foreground">
          All job posts
        </h1>
        <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md w-fit">
          Post a new job
        </Button>
      </div>

      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <input
          placeholder="Search name of job postings"
          className="w-full md:w-[40rem] h-10 pl-10 rounded-md bg-muted border-muted-foreground/20 text-foreground placeholder:text-muted-foreground"
        />
      </div>
    </div>
  );
}
