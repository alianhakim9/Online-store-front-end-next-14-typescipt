"use client";

import { Product } from "@/app/lib/definitions";
import {
  addToFavourite,
  removeFavourite,
} from "@/app/lib/redux/slices/products_slice";
import { RootState } from "@/app/lib/redux/store";
import { showSonnerToast } from "@/app/lib/utils";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { IoTrash } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

interface IAddToFav {
  product: Product;
}

export function DeleteFavProductButton({ product }: IAddToFav) {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const userId = session?.user.userId.toString();

  const handleRemoveFavProduct = () => {
    if (userId) {
      dispatch(
        removeFavourite({
          product: product,
          userId: userId,
        })
      );
    }
  };

  return (
    <Button
      className="rounded-lg hover:shadow-md w-full"
      variant="destructive"
      onClick={handleRemoveFavProduct}
      size="sm"
    >
      <IoTrash className="block md:hidden" size={24} />
      <span className="hidden md:block">Hapus Produk Favorit</span>
    </Button>
  );
}
