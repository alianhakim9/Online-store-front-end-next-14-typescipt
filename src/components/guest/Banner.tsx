"use client";

import { carousels } from "@/utils/content";

import ImageLoad from "./ImageLoad";

import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Banner = () => {
  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      autoplay={{
        delay: 2500,
        disableOnInteraction: true,
      }}
      centeredSlides
      spaceBetween={30}
      className="max-w-screen-2xl "
    >
      {carousels.map((carousel, index) => (
        <SwiperSlide key={index}>
          <ImageLoad
            className="h-[500px] w-screen"
            src={carousel}
            alt="banner-img"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Banner;
