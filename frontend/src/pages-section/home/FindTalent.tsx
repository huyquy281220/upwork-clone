import ActionCard from "@/components/home/ActionCard";

const actionCards = [
  {
    title: "Post a job",
    description: "Talent comes to you",
    buttonText: "Post a job for free",
    buttonLink: "#",
    color: "green",
  },
  {
    title: "Browse and buy projects",
    description: "Talent comes to you",
    buttonText: "Browse projects",
    buttonLink: "#",
    color: "white",
  },
  {
    title: "Get advice from an industry expert",
    description: "Consultations",
    buttonText: "Browse projects",
    buttonLink: "#",
    color: "white",
  },
];

export default function FindTalentSection() {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">
          Find talent
          <br />
          your way
        </h2>

        <p className="text-gray-600 mb-8 max-w-2xl">
          Work with the largest network of independent professionals and get
          things done—from quick turnarounds to big transformations.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {actionCards.map((card, index) => (
            <ActionCard
              key={index}
              title={card.title}
              description={card.description}
              buttonText={card.buttonText}
              buttonLink={card.buttonLink}
              color={card.color as "green" | "white"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
