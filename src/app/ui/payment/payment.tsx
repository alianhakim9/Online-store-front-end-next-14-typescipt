"use client";

import { API_BASE_URL } from "@/app/lib/constants";
import { RootState } from "@/app/lib/redux/store";
import ImageLoad from "@/app/ui/image-load";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import { CartItem } from "@/app/lib/definitions";
import { convertToRupiah } from "@/app/lib/utils";
import { Midtrans } from "@/app/ui/payment/midtrans";
import PaymentButton from "@/app/ui/payment/payment-button";
import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface IPaymentPage {
  tsToken?: string;
}

export default function PaymentPage({ tsToken }: IPaymentPage) {
  const cartItems = useSelector((state: RootState) => state.carts.cartItems);
  const totalPrice = useSelector((state: RootState) => state.carts.totalPrice);

  const [isPay, setIsPay] = useState(false);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
      <div>
        <Link href={"/cart"} className="text-sm mb-4 underline">
          Kembali ke halaman keranjang
        </Link>
        <h3 className="text-1xl md:text-2xl font-semibold">
          Rincian pembelian
        </h3>
        {cartItems.map((cart: CartItem, index) => (
          <div key={index}>
            <ScrollArea className="max-h-[500px]">
              <div className="flex gap-4 mt-4">
                <div>
                  <ImageLoad
                    src={`${API_BASE_URL}${cart.product.images[0].formats.thumbnail.url}`}
                    alt={cart.product.name}
                    className="h-24 w-24"
                  />
                </div>
                <div>
                  <h4 className="text-1xl font-semibold md:text-2xl">
                    {cart.product.name}
                  </h4>
                  <p className="text-sm">
                    {convertToRupiah(Number(cart.product.price))}
                  </p>
                  <p className="text-sm">Quantity : {cart.quantity}</p>
                </div>
              </div>
            </ScrollArea>
            <Separator className="mt-2" />
          </div>
        ))}
        <p className="font-semibold mt-2 text-sm">
          Total yang harus dibayar : {convertToRupiah(totalPrice)}
        </p>
        <PaymentButton
          isPay={isPay}
          onIsPay={() => setIsPay(true)}
          tsToken={tsToken}
        />
      </div>
      {isPay && <Midtrans tsToken={tsToken} />}
    </div>
  );
}
