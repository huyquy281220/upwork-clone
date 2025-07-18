import Image from "next/image";
import { CheckCircle } from "lucide-react";
import FeatureCard from "@/pages-section/home/components/FeatureCard";
import { EnterpriseImg } from "@/assets/images";

const features = [
  {
    icon: <CheckCircle className="h-5 w-5" />,
    title: "Access top 3% of talent on Prowork",
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
    <section className="mx-auto bg-[#13544e] text-white rounded-lg overflow-hidden">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2 px-10 py-20">
          <h2 className="text-[3rem] font-bold mb-6">
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
            src={EnterpriseImg}
            alt="Person working at desk"
            width={500}
            height={400}
            className="w-full h-full"
          />
        </div>
      </div>
    </section>
  );
}
