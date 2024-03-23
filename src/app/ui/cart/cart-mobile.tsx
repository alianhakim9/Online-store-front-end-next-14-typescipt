"use client";

import { RootState } from "@/app/lib/redux/store";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import EmptyCart from "@/app/ui/cart/empy-cart";
import { CartItem } from "@/app/lib/definitions";
import ImageLoad from "../image-load";
import { API_BASE_URL } from "@/app/lib/constants";
import { convertToRupiah } from "@/app/lib/utils";
import Link from "next/link";
import QuantityButton from "../quantity-button";
import CartButton from "./button";

export default function CartMobile() {
  const { cartItems } = useSelector((state: RootState) => state.carts);
  const { data: session } = useSession();
  const userId = session?.user.userId.toString();

  if (cartItems.length === 0) {
    <EmptyCart />;
  }

  return (
    <div className="flex flex-col gap-2">
      {cartItems.map((item: CartItem) => (
        <div className="flex gap-2" key={item.id}>
          <div>
            <ImageLoad
              alt={item.product.name}
              src={
                item.product.images
                  ? `${API_BASE_URL}${item.product.images[0].url}`
                  : item.product.imgUrl
              }
              className="w-20 h-20"
            />
          </div>
          <div className="flex flex-col gap-1">
            <Link
              href={`/products/${item.product.id}`}
              className="font-semibold"
            >
              {item.product.name}
            </Link>
            <p className="text-sm">
              Subtotal : {convertToRupiah(item.subtotal)}
            </p>
            <p className="text-sm">Kuantitas : {item.quantity}</p>
            <QuantityButton
              quantity={item.quantity}
              fromCart
              stock={item.product.stock}
              productId={item.product.id}
              cartId={item.id || ""}
              userId={userId}
            />
          </div>
        </div>
      ))}
      <CartButton />
    </div>
  );
}
