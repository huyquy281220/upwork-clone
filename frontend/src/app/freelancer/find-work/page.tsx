// import { Banner } from "@/pages/freelancer/find-work/Banner";
import { JobListing } from "@/pages/freelancer/find-work/JobListing";
import { UserSidebar } from "@/pages/freelancer/find-work/UserSidebar";

export default function FindWork() {
  return (
    <div className="min-h-screen bg-background">
      {/* <Banner /> */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-3">
            <JobListing />
          </div>
          <div className="lg:col-span-1">
            <UserSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
