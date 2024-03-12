"use client";

import { CartItem, Product } from "@/app/lib/definitions";
import { addToCart } from "@/app/lib/redux/slices/carts_slice";
import { RootState } from "@/app/lib/redux/store";
import { showSonnerToast } from "@/app/lib/utils";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

interface IAddToCart {
  product: Product;
}

export function AddToCartButton({ product }: IAddToCart) {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const userId = session?.user.userId.toString();
  const cartItems = useSelector((state: RootState) => state.carts.cartItems);

  const handleAddToCart = useCallback(() => {
    const cartItem: CartItem = {
      product: product,
      quantity: 1,
      subtotal: Number(product.price),
      userId,
    };
    dispatch(addToCart(cartItem));
    const existingProduct = cartItems.find(
      (item: any) => item.product.id === cartItem.product.id
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

  return (
    <Button
      className="rounded-lg hover:shadow-md text-sm"
      onClick={handleAddToCart}
    >
      Tambah keranjang
    </Button>
  );
}
