"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { Navigation } from "swiper/modules";
import { DraftCard } from "./DraftCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import "swiper/css";
import "swiper/css/navigation";

interface Draft {
  id: number;
  title: string;
  status: string;
  description: string;
  icon: string;
}

interface DraftGridSliderProps {
  drafts: Draft[];
}

export function DraftGridSlider({ drafts }: DraftGridSliderProps) {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  return (
    <div className="relative group">
      <Swiper
        modules={[Navigation]}
        spaceBetween={16}
        slidesPerView={3}
        onSwiper={setSwiper}
        onSlideChange={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 16,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 16,
          },
        }}
        className="draft-grid-slider"
      >
        {drafts.map((draft) => (
          <SwiperSlide key={draft.id}>
            <DraftCard {...draft} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Buttons */}
      {drafts.length > 3 && (
        <>
          <button
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-20 w-10 h-10 bg-background border border-border rounded-full flex items-center justify-center hover:bg-muted hover:border-green-600 transition-all duration-200 shadow-lg ${
              isBeginning ? "opacity-50 cursor-not-allowed" : "opacity-100"
            }`}
            onClick={() => swiper?.slidePrev()}
            disabled={isBeginning}
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>

          <button
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-20 w-10 h-10 bg-background border border-border rounded-full flex items-center justify-center hover:bg-muted hover:border-green-600 transition-all duration-200 shadow-lg ${
              isEnd ? "opacity-50 cursor-not-allowed" : "opacity-100"
            }`}
            onClick={() => swiper?.slideNext()}
            disabled={isEnd}
          >
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>
        </>
      )}
    </div>
  );
}
