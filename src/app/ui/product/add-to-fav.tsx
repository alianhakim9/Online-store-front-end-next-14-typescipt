"use client";

import { Product } from "@/app/lib/definitions";
import { addFavProduct } from "@/app/lib/redux/rtk/productApi";
import { addToFavourite } from "@/app/lib/redux/slices/products_slice";
import { RootState } from "@/app/lib/redux/store";
import { showSonnerToast } from "@/app/lib/utils";
import { MotionButton } from "@/app/ui/motion-button";
import { useSession } from "next-auth/react";
import { BiHeart } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  product: Product;
}

export function AddToFavButton({ product }: Props) {
  const { data: session } = useSession();
  const userId = session?.user.userId.toString();
  const dispatch = useDispatch();
  const favProducts = useSelector((state: RootState) => state.product.products);

  const handleAddToFavourite = () => {
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
    <MotionButton
      size="icon"
      variant="ghost"
      onClick={handleAddToFavourite}
      className="rounded-full"
      whileTap={{
        scale: 0.9,
      }}
    >
      <BiHeart size={24} />
    </MotionButton>
  );
}
