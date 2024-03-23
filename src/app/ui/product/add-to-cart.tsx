"use client";

import { CartItem, Product } from "@/app/lib/definitions";
import { addCartItem } from "@/app/lib/redux/rtk/cartApi";
import { addToCart } from "@/app/lib/redux/slices/carts_slice";
import { RootState } from "@/app/lib/redux/store";
import { showSonnerToast } from "@/app/lib/utils";
import { MotionButton } from "@/app/ui/motion-button";
import { useSession } from "next-auth/react";
import { useCallback } from "react";
import { BiSolidCartAdd } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";

interface IAddToCart {
  product: Product;
  quantity?: number;
  outline?: boolean;
}

export function AddToCartButton({ product, quantity, outline }: IAddToCart) {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const userId = session?.user.userId.toString();
  const cartItems = useSelector((state: RootState) => state.carts.cartItems);

  const handleAddToCart = useCallback(() => {
    const cartItem: CartItem = {
      product: product,
      quantity: quantity ? quantity : 1,
      subtotal: quantity
        ? Number(product.price) * quantity
        : Number(product.price),
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
  }, [cartItems, dispatch, product, quantity, userId]);

  return (
    <MotionButton
      className="rounded-lg hover:shadow-md text-sm "
      onClick={handleAddToCart}
      size="sm"
      variant={outline ? "outline" : "default"}
      whileTap={{
        scale: 0.9,
      }}
    >
      <BiSolidCartAdd size={24} className="block md:hidden" />
      <span className="hidden md:block">Tambah keranjang</span>
    </MotionButton>
  );
}
