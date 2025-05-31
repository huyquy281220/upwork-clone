import {
  JobHeader,
  JobDescription,
  JobSkills,
  JobActivity,
  ClientRecentHistory,
} from "@/pages-section/freelancer/jobs";

export default function JobDetailPage() {
  return (
    <>
      <JobHeader />
      <JobDescription />
      <JobSkills />
      <JobActivity />
      <ClientRecentHistory />
    </>
  );
}
