"use client";

import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { addCartItem } from "@/redux/rtk/cartApi";
import { addFavProduct } from "@/redux/rtk/productApi";
import { addToCart } from "@/redux/slices/carts_slice";
import { RootState } from "@/redux/store";
import { CartItem } from "@/types/cart";
import { Product } from "@/types/local";
import { API_BASE_URL } from "@/utils/constants";
import { convertToRupiah, showSonnerToast } from "@/utils/helper";
import { HeartFilledIcon, HeartIcon } from "@radix-ui/react-icons";
import { Session } from "next-auth";
import Link from "next/link";
import { useCallback } from "react";
import { BiCart } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import ImageLoad from "./ImageLoad";
import { addToFavourite } from "@/redux/slices/products_slice";

interface IProductProps {
  product: Product;
  session?: Session | null;
  showFavBtn?: boolean;
  showDelFavBtn?: boolean;
}

const ProductCard = ({
  product,
  session,
  showFavBtn,
  showDelFavBtn,
}: IProductProps) => {
  const dispatch = useDispatch();
  const thumbnail = product.images[0].formats.thumbnail.url;
  const cartItems = useSelector((state: RootState) => state.carts.cartItems);
  const favProducts = useSelector((state: RootState) => state.product.products);
  const userId = session?.user.userId.toString();

  const handleAddToCart = useCallback(() => {
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
        "Produk sudah ada di keranjang",
        existingProduct.product.name
      );
    } else {
      if (userId) {
        // @ts-ignore
        dispatch(addCartItem(cartItem));
      }
      showSonnerToast("Produk ditambahkan ke keranjang", cartItem.product.name);
    }
  }, [cartItems, dispatch, product, userId]);

  const handleAddFavProduct = () => {
    if (userId) {
      dispatch(addToFavourite(product));
      const existingProduct = favProducts.find(
        (item) => item.id === product.id
      );
      if (existingProduct) {
        showSonnerToast(
          "Produk sudah ada halaman favorit",
          existingProduct.name
        );
      } else {
        dispatch(
          // @ts-ignore
          addFavProduct({
            productId: product.id,
            userId: userId,
          })
        );
        showSonnerToast("Produk ditambahkan ke favorit", product.name);
      }
    }
  };
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
              {showFavBtn && (
                <Button
                  variant="default"
                  size="icon"
                  className="rounded-full"
                  onClick={handleAddFavProduct}
                >
                  {product.isFavourite ? (
                    <HeartFilledIcon color="red" />
                  ) : (
                    <HeartIcon color="white" />
                  )}
                </Button>
              )}
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
      <CardFooter
        className={`${
          showDelFavBtn ? "flex flex-col gap-2 w-full" : "self-center "
        }`}
      >
        <Button
          className="rounded-lg hover:shadow-md"
          onClick={handleAddToCart}
        >
          <BiCart size={20} className="mr-1" /> Tambah keranjang
        </Button>
        {showDelFavBtn && (
          <Button className="rounded-lg hover:shadow-md" variant="destructive">
            Hapus Produk Favorit
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
