"use client";

import SectionHeading from "@/pages-section/home/components/SectionHeading";
import TestimonialCard from "@/pages-section/home/components/TestimonialCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { ArrowRight } from "lucide-react";
import { ArrowLeft } from "lucide-react";
import { useRef } from "react";
import { Swiper as SwiperType } from "swiper";
import { cn } from "@/lib/utils";

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
  // const swiper = useSwiper();
  const swiperRef = useRef<SwiperType>(null);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <SectionHeading title="Trusted by leading brands and startups" />

        <div className="relative">
          <Swiper
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <TestimonialCard
                  quote={testimonial.quote}
                  author={testimonial.author}
                  position={testimonial.position}
                  company={testimonial.company}
                  bgColor={testimonial.bgColor}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="absolute top-0 left-0 z-10 flex items-center h-full bg-[rgba(255,255,255,0.1)]">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className={cn(
                "p-1 bg-white rounded-full"
                // swiperRef.current?.allowSlidePrev ? "opacity-100" : "opacity-0"
              )}
            >
              <ArrowLeft className="text-[#14a800]" />
            </button>
          </div>
          <div className="absolute top-0 right-0 z-10 flex items-center h-full bg-[rgba(255,255,255,0.1)]">
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className={cn(
                "p-1 bg-white rounded-full"
                // swiperRef.current?.allowSlideNext ? "opacity-100" : "opacity-0"
              )}
            >
              <ArrowRight className="text-[#14a800]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
