import Image from "next/image";
import { Check } from "lucide-react";

const features = [
  {
    icon: <Check className="h-5 w-5 text-green-600" />,
    title: "No cost to join",
    description:
      "Register and browse professionals, explore projects, or even book a consultation.",
  },
  {
    icon: <Check className="h-5 w-5 text-green-600" />,
    title: "Post a job and hire top talent",
    description:
      "Finding talent doesn't have to be a chore. Post a job or we can search for you!",
  },
  {
    icon: <Check className="h-5 w-5 text-green-600" />,
    title: "Work with the best—without breaking the bank",
    description:
      "Upwork makes it affordable to up your work and take advantage of low transaction rates.",
  },
];

export default function WorkGameSection() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Up your work game, it&#39;s easy
        </h2>

        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/3">
            <Image
              src="/placeholder.svg?height=300&width=300"
              alt="Hand pointing"
              width={300}
              height={300}
              className="mx-auto"
            />
          </div>

          <div className="md:w-2/3">
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-4">
                  <div className="mt-1">{feature.icon}</div>
                  <div>
                    <h3 className="font-medium">{feature.title}</h3>
                    <p className="text-sm text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex gap-4">
              <button className="bg-green-600 hover:bg-green-700">
                Find Talent
              </button>
              <button className="border-gray-300">Find Work</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
