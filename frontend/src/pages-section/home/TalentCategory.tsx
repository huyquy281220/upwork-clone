import CategoryCard from "@/pages-section/home/components/CategoryCard";
import SectionHeading from "@/pages-section/home/components/SectionHeading";

const categories = [
  {
    title: "Development & IT",
    jobCount: "1,153",
    hourlyRate: "$25+/hr",
  },
  {
    title: "AI Services",
    jobCount: "8,153",
    hourlyRate: "$28+/hr",
  },
  {
    title: "Design & Creative",
    jobCount: "4,168",
    hourlyRate: "$25+/hr",
  },
  {
    title: "Sales & Marketing",
    jobCount: "1,778",
    hourlyRate: "$25+/hr",
  },
  {
    title: "Writing & Translation",
    jobCount: "1,576",
    hourlyRate: "$20+/hr",
  },
  {
    title: "Admin & Customer Support",
    jobCount: "1,173",
    hourlyRate: "$16+/hr",
  },
  {
    title: "Finance & Accounting",
    jobCount: "1,576",
    hourlyRate: "$25+/hr",
  },
  {
    title: "Engineering & Architecture",
    jobCount: "1,173",
    hourlyRate: "$30+/hr",
  },
];

export default function TalentCategorySection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Browse talent by category"
          subtitle="Looking for work? Browse jobs"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-6">
          {categories.map((category, index) => (
            <CategoryCard
              key={index}
              title={category.title}
              jobCount={category.jobCount}
              hourlyRate={category.hourlyRate}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
