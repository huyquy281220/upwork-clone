import {
  ServiceCard,
  PortfolioCard,
  SkillCard,
} from "@/components/freelancer/profile";

const services = [
  {
    title: "web & design",
    price: "$30.00",
    description:
      "Help people get to know you at a glance. What work do you do best? Tell them clearly, using paragraphs or bullet points. You can always edit later, just make sure you proofread! How.",
    verified: true,
  },
];

export function MainContent() {
  return (
    <div className="space-y-8">
      <div className="grid gap-6">
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </div>
      <PortfolioCard />
      <SkillCard />
    </div>
  );
}
