import ActionCard from "@/components/home/ActionCard";

const actionCards = [
  {
    title: "Post a job and hire a pro",
    buttonText: "Talent marketplace",
    buttonLink: "#",
  },
  {
    title: "Browse and buy projects",
    buttonText: "Project Catalog",
    buttonLink: "#",
  },
  {
    title: "Get advice from an industry expert",
    buttonText: "Consultations",
    buttonLink: "#",
  },
];

export default function FindTalentSection() {
  return (
    <section className="py-5 px-3 rounded-md bg-gray-100 my-16 bg-[url(/FindTalent.jpg)] bg-cover bg-center">
      <div className="container mx-auto px-4">
        <p className="text-3xl text-white font-semibold">For clients</p>
        <h2 className="mb-8 mt-32 text-[4rem] leading-none text-white font-bold">
          Find talent
          <br />
          your way
        </h2>

        <p className="mb-8 max-w-md text-2xl text-white font-semibold">
          Work with the largest network of independent professionals and get
          things done—from quick turnarounds to big transformations.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {actionCards.map((card, index) => (
            <ActionCard
              key={index}
              title={card.title}
              buttonText={card.buttonText}
              buttonLink={card.buttonLink}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
