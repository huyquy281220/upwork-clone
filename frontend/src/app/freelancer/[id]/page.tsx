import {
  ProfileSidebar,
  MainContent,
} from "@/pages-section/freelancer/profile";
import { CertificationCard } from "@/pages-section/freelancer/profile/components/CertificationCard";
import { EmploymentHistoryCard } from "@/pages-section/freelancer/profile/components/EmploymentHistoryCard";

export default async function FreelancerProfile() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          <div className="lg:col-span-4">
            <ProfileSidebar />
          </div>
          <div className="lg:col-span-8">
            <MainContent />
          </div>
        </div>
        <div className="space-y-8">
          <CertificationCard />
          <EmploymentHistoryCard />
        </div>
      </div>
    </div>
  );
}
