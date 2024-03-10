"use client";

import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { addToCart } from "@/redux/slices/carts_slice";
import { CartItem } from "@/types/cart";
import { Product } from "@/types/local";
import { API_BASE_URL } from "@/utils/constants";
import { convertToRupiah, showSonnerToast } from "@/utils/helper";
import { Session } from "next-auth";
import Link from "next/link";
import { BiCart } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import ImageLoad from "./ImageLoad";
// import { addCartItem } from "@/redux/rtk/cartApi";
import { addCartItem } from "@/redux/rtk/cartApi";
import { RootState } from "@/redux/store";
import { HeartFilledIcon, HeartIcon } from "@radix-ui/react-icons";
import { useCallback } from "react";

interface IProductProps {
  product: Product;
  session?: Session | null;
}

const ProductCard = ({ product, session }: IProductProps) => {
  const dispatch = useDispatch();
  const thumbnail = product.images[0].formats.thumbnail.url;
  const cartItems = useSelector((state: RootState) => state.carts.cartItems);

  const handleAddToCart = useCallback(() => {
    const userId = session?.user.userId.toString();
    // const userId = session?.user.sub;
    const cartItem: CartItem = {
      product: product,
      quantity: 1,
      subtotal: Number(product.price),
      userId,
    };
    dispatch(addToCart(cartItem));
    const existingProduct = cartItems.find(
      (item) => item.product.id === cartItem.product.id
    );
    if (existingProduct) {
      showSonnerToast(
        "Product already exist in cart",
        existingProduct.product.name
      );
    } else {
      if (userId) {
        // @ts-ignore
        dispatch(addCartItem(cartItem));
      }
      showSonnerToast("Product added to cart", cartItem.product.name);
    }
  }, [cartItems, dispatch, product, session?.user.userId]);

  const handleFavourite = () => {};

  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <div>
          <div className="relative">
            <ImageLoad
              className="h-40 w-40 mx-auto"
              src={
                thumbnail
                  ? `${API_BASE_URL}${thumbnail}`
                  : "/images/placeholder.jpg"
              }
              alt={product.name}
            />
            <div className="absolute bottom-3 right-0">
              <Button variant="default" size="icon" className="rounded-full">
                {Number(product.id) % 2 === 0 ? (
                  <HeartFilledIcon color="red" />
                ) : (
                  <HeartIcon color="white" />
                )}
              </Button>
            </div>
          </div>
          <p className="font-semibold text-sm mt-2">
            {convertToRupiah(Number(product.price))}
          </p>
          <div className="bg-slate-100 px-2 py-1 rounded-lg my-2 relative bottom-0 left-0 w-full text-left">
            <p className="text-sm line-clamp-1">{product.category.name}</p>
          </div>
        </div>
        <CardTitle className="text-base text-lime-700 line-clamp-2 hover:text-lime-800">
          <Link href={`/products/${product.id}`}>{product.name}</Link>
        </CardTitle>
      </CardHeader>
      <CardFooter className="self-center">
        <Button
          className="rounded-lg hover:shadow-md"
          onClick={handleAddToCart}
        >
          <BiCart size={20} className="mr-2" /> Add To Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
