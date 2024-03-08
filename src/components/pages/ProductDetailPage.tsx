"use client";

import QuantityButton from "@/components/guest/QuantityButton";
import { Button } from "@/components/ui/button";
import { API_BASE_URL } from "@/utils/constants";
import { useState } from "react";
import { BiCart } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { Product } from "@/types/local";
import { BaseResponse } from "@/types/responses";
import { convertToRupiah, showSonnerToast } from "@/utils/helper";
import { useSession } from "next-auth/react";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa6";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import ImageLoad from "../guest/ImageLoad";

interface IProductDetailPage {
  product: BaseResponse<Product>;
}

const ProductDetailPage = ({ product }: IProductDetailPage) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass>();
  const { data: session } = useSession();
  const data = product.data;
  const productImages = data.images;

  const handleAddToCart = async () => {
    showSonnerToast("Product added to cart", data.name);
    const item = {
      id: data.id,
      name: data.name,
      image: data.images[0].url,
      price: data.price,
      quantity,
      stock: data.stock,
      subTotal: Number(data.price) * quantity,
      weight: data.weight,
      productId: data.id,
    };
  };

  return (
    <div className="flex gap-10 mt-10 container">
      <div>
        {product &&
          (productImages.length > 1 ? (
            <div className="flex flex-col gap-2">
              <Swiper
                loop={true}
                spaceBetween={10}
                navigation={true}
                thumbs={{
                  swiper:
                    thumbsSwiper && !thumbsSwiper.destroyed
                      ? thumbsSwiper
                      : null,
                }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="rounded-lg max-w-lg"
                centeredSlides={true}
              >
                {productImages.map((image, index) => (
                  <SwiperSlide key={index}>
                    <ImageLoad
                      src={`${API_BASE_URL}${image.url}`}
                      alt={image.url}
                      className="w-96 h-96 mx-auto"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              {/* Thumbnail */}
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
          ) : (
            <div>
              <ImageLoad
                src={`${API_BASE_URL}${data.images[0].url}`}
                className="h-96 w-96"
                alt={data.name}
              />
            </div>
          ))}
        <div className="flex flex-col gap-1 mt-5">
          <p className="font-semibold">Share this product</p>
          <div className="flex gap-2 items-center">
            <FaFacebook size={24} />
            <FaTwitter size={24} />
            <FaInstagram size={24} />
            <FaWhatsapp size={24} />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <h3 className="font-bold text-3xl">{data.name}</h3>
        <hr />
        <p className="text-2xl text-green-700 font-semibold">
          {convertToRupiah(Number(data.price))}
        </p>
        <p>{data.description}</p>
        <div className="flex gap-4 items-center">
          <p className="text-sm">Quantity: </p>
          <QuantityButton
            quantity={quantity}
            onDecrease={() => setQuantity((prev) => prev - 1)}
            onIncrease={() => setQuantity((prev) => prev + 1)}
            productId={product.data.id.toString()}
            stock={data.stock}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleAddToCart}>
            <BiCart size={16} className="mr-2" />
            Add To Cart
          </Button>
          <Button variant="default" size="sm">
            Buy This Product
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
