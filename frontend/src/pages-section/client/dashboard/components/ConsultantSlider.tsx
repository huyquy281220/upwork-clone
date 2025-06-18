"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";
import { ConsultantCard } from "./ConsultantCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import "swiper/css";
import "swiper/css/navigation";

interface Consultant {
  id: number;
  name: string;
  location: string;
  rating: string;
  jobSuccess: string;
  rate: string;
  title: string;
  description: string;
  duration: string;
  avatar: string;
}

interface ConsultantSliderProps {
  consultants: Consultant[];
}

export function ConsultantSlider({ consultants }: ConsultantSliderProps) {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  return (
    <div className="relative group">
      <Swiper
        modules={[Navigation]}
        spaceBetween={16}
        slidesPerView={1}
        onSwiper={setSwiper}
        onSlideChange={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        className="consultant-slider h-[22rem]"
      >
        {consultants.map((consultant) => (
          <SwiperSlide key={consultant.id} className="h-full">
            <ConsultantCard {...consultant} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Buttons - Always visible */}
      <button
        className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-20 w-10 h-10 bg-background border-2 border-border rounded-full flex items-center justify-center hover:bg-muted hover:border-green-600 transition-all duration-200 shadow-lg ${
          isBeginning ? "opacity-50 cursor-not-allowed" : "opacity-100"
        }`}
        onClick={() => swiper?.slidePrev()}
        disabled={isBeginning}
      >
        <ChevronLeft className="w-6 h-6 text-foreground" />
      </button>

      <button
        className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-20 w-10 h-10 bg-background border-2 border-border rounded-full flex items-center justify-center hover:bg-muted hover:border-green-600 transition-all duration-200 shadow-lg ${
          isEnd ? "opacity-50 cursor-not-allowed" : "opacity-100"
        }`}
        onClick={() => swiper?.slideNext()}
        disabled={isEnd}
      >
        <ChevronRight className="w-6 h-6 text-foreground" />
      </button>
    </div>
  );
}
