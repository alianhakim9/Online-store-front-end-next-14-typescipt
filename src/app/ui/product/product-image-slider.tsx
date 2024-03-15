"use client";

import { API_BASE_URL } from "@/app/lib/constants";
import { Product } from "@/app/lib/definitions";
import { useState } from "react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import ImageLoad from "@/app/ui/image-load";

export function ProductImageSlider({ product }: { product: Product }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass>();
  const productImages = product.images;

  return (
    <div>
      {product &&
        (product.images.length > 1 ? (
          <div className="flex flex-col gap-2">
            <Swiper
              loop={true}
              spaceBetween={10}
              navigation={true}
              thumbs={{
                swiper:
                  thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
              }}
              modules={[FreeMode, Navigation, Thumbs]}
              className="rounded-lg w-full md:max-w-lg"
              centeredSlides={true}
            >
              {productImages.map((image, index) => (
                <SwiperSlide key={index}>
                  <ImageLoad
                    src={`${API_BASE_URL}${image.url}`}
                    alt={image.url}
                    className="w-52 h-52 md:w-96 md:h-96 mx-auto"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            {/* Thumbnail */}
            <div className="hidden md:block">
              <Swiper
                onSwiper={setThumbsSwiper}
                loop={true}
                spaceBetween={1}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="thumbs rounded-lg w-full"
              >
                {productImages.map((image, index) => (
                  <SwiperSlide key={index}>
                    <button>
                      <ImageLoad
                        src={`${API_BASE_URL}${image.url}`}
                        alt={image.url}
                        className="w-20 h-20"
                      />
                    </button>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        ) : (
          <div>
            <ImageLoad
              src={`${API_BASE_URL}${product.images[0].url}`}
              className="w-52 h-52 md:h-96 md:w-96"
              alt={product.name}
            />
          </div>
        ))}
    </div>
  );
}
