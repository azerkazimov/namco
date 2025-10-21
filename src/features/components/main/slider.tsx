import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar, A11y, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { mining } from "@/data/mining";
import SliderCard from "./slider-card";
import { Mining } from "@/types/mining.types";

export default function Slider() {
  return (
    <div className="relative flex justify-start items-center">
      <Swiper
        modules={[Navigation, Autoplay, Scrollbar, A11y]}
        spaceBetween={10}
        slidesPerView={2}
        navigation={{
          prevEl: ".custom-nav-prev",
          nextEl: ".custom-nav-next",
        }}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        className="absolute left-[-200px] "
      >
        {mining.map((mining: Mining, index) => (
          <SwiperSlide className="" key={index}>
            <SliderCard mining={mining} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
