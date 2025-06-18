import {
  WelcomeSection,
  LastStepsSection,
  HelpResourcesSection,
  PaymentsSafetySection,
  OverviewSection,
  ConsultationSection,
} from "@/pages-section/client/dashboard";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-6 space-y-8">
        <WelcomeSection />
        <LastStepsSection />
        <OverviewSection />
        <ConsultationSection />
        <PaymentsSafetySection />
        <HelpResourcesSection />
      </div>
    </div>
  );
}
