import Image from "next/image";
import { CheckCircle } from "lucide-react";
import FeatureCard from "@/pages-section/home/components/FeatureCard";
import { PersonWithHeadsetImg } from "@/assets/images";

const features = [
  {
    icon: <CheckCircle className="h-5 w-5" />,
    title: "Proof of quality",
    description:
      "Check any pro's work samples, client reviews, and identity verification.",
  },
  {
    icon: <CheckCircle className="h-5 w-5" />,
    title: "No cost until you hire",
    description:
      "Interview potential fits for your job, negotiate rates, and only pay for work you approve.",
  },
  {
    icon: <CheckCircle className="h-5 w-5" />,
    title: "Safe and secure",
    description:
      "Focus on your work knowing we help protect your data and privacy. We're here with 24/7 support if you need it.",
  },
];

export default function WhyUpworkSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8 items-center bg-secondary">
          <div className="md:w-1/2 pl-4">
            <h2 className="text-3xl font-bold mb-6">
              Why businesses
              <br />
              turn to Upwork
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
            <div className="bg-green-600 text-white p-8 rounded-md">
              <h3 className="text-2xl font-bold mb-2">
                We&#39;re the world&#39;s work marketplace
              </h3>

              <div className="flex items-center gap-2 mb-2">
                <span className="text-white text-xl">★</span>
                <span className="text-xl font-bold">4.9/5</span>
              </div>

              <p className="text-sm font-medium mb-4">
                Clients rate professionals on Upwork
              </p>

              <Image
                src={PersonWithHeadsetImg}
                alt="Person illustration"
                width={200}
                height={300}
                className="mx-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
