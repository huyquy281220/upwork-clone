import SectionHeading from "@/components/home/SectionHeading";
import TestimonialCard from "@/components/home/TestimonialCard";

const testimonials = [
  {
    quote:
      "We used Upwork to find, hire, and pay skilled professionals from around the world. The platform helps us find the right talent for our business needs.",
    author: "John Smith",
    position: "Product Manager",
    company: "Tech Company",
    bgColor: "bg-green-800",
  },
  {
    quote:
      "One of the advantages of utilizing freelancers is flexibility. Upwork makes quality, speed, and agility possible for our business.",
    author: "Jane Doe",
    position: "Director of Marketing",
    company: "Microsoft",
    bgColor: "bg-orange-600",
  },
  {
    quote:
      "One of the advantages of utilizing freelancers is flexibility. Upwork makes quality, speed, and agility possible for our business.",
    author: "Jane Doe",
    position: "Director of Marketing",
    company: "Google",
    bgColor: "bg-main",
  },
];

export default function TrustedBrandsSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <SectionHeading title="Trusted by leading brands and startups" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              position={testimonial.position}
              company={testimonial.company}
              bgColor={testimonial.bgColor}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
