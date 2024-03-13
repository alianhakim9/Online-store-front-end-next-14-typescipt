"use client";

import { Product } from "@/app/lib/definitions";
import { addToFavourite } from "@/app/lib/redux/slices/products_slice";
import { RootState } from "@/app/lib/redux/store";
import { showSonnerToast } from "@/app/lib/utils";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";

interface IAddToFav {
  product: Product;
}

export function AddToFavouriteButton({ product }: IAddToFav) {
  const dispatch = useDispatch();
  const favProducts = useSelector((state: RootState) => state.product.products);
  const { data: session } = useSession();
  const userId = session?.user.userId.toString();
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
    <Button
      className="rounded-lg hover:shadow-md w-full"
      variant="destructive"
      onClick={handleAddFavProduct}
      size="sm"
    >
      Hapus Produk Favorit
    </Button>
  );
}
