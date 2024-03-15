"use client";

import ImageLoad from "@/app/ui/image-load";

import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { carousels } from "@/app/lib/data";

export function Banner() {
  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      autoplay={{
        delay: 2500,
        disableOnInteraction: true,
      }}
      centeredSlides
      spaceBetween={30}
      className="w-full"
    >
      {carousels.map((carousel, index) => (
        <SwiperSlide key={index}>
          <ImageLoad
            className="h-[200px] md:h-[500px] w-full"
            src={carousel}
            alt="banner-img rounded-none"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
