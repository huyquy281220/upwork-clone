import Image from "next/image";
import { CheckCircle } from "lucide-react";
import FeatureCard from "@/components/home/FeatureCard";

const features = [
  {
    icon: <CheckCircle className="h-5 w-5" />,
    title: "Access top 3% of talent on Upwork",
    description:
      "We analyze your needs and connect you with top talent and agencies.",
  },
  {
    icon: <CheckCircle className="h-5 w-5" />,
    title: "Control your workflow",
    description: "Use our collaboration tools and payment protection.",
  },
  {
    icon: <CheckCircle className="h-5 w-5" />,
    title: "Partner with Talent Success",
    description: "Get personalized support for hiring, onboarding, and more.",
  },
];

export default function CompaniesSection() {
  return (
    <section className="py-16 bg-green-800 text-white rounded-lg">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-6">
              This is how
              <br />
              good companies
              <br />
              find good company.
            </h2>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>
          </div>

          <div className="md:w-1/2">
            <Image
              src="/placeholder.svg?height=400&width=500"
              alt="Person working at desk"
              width={500}
              height={400}
              className="rounded-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
