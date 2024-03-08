"use client";

import ImageLoad from "@/components/guest/ImageLoad";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { setTransactionToken } from "@/redux/slices/paymentSlice";
import { RootState } from "@/redux/store";
import { CartItem } from "@/types/cart";
import { API_BASE_URL } from "@/utils/constants";
import { convertToRupiah } from "@/utils/helper";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Page() {
  const dispatch = useDispatch();
  const transactionToken = useSelector(
    (state: RootState) => state.payment.transactionToken
  );
  const cartItems = useSelector((state: RootState) => state.carts.cartItems);
  const totalPrice = useSelector((state: RootState) => state.carts.totalPrice);

  const [isPay, setIsPay] = useState(false);

  useEffect(() => {
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    const myMidtransClientKey = "SB-Mid-client-Ju4W5PvzpXutyhSe";
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);

    const checkSnapAvailability = () => {
      // @ts-ignore
      if (window.snap && isPay) {
        // Access window.snap here
        // @ts-ignore
        window.snap.embed(transactionToken, {
          embedId: "snap-container",
        });
      } else {
        // Retry after a short delay
        setTimeout(checkSnapAvailability, 100);
      }
    };

    checkSnapAvailability();

    return () => {
      document.body.removeChild(scriptTag);
    };
  }, [isPay, transactionToken]);

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Link href={"/cart"} className="text-sm mb-4 underline">
          Back to cart
        </Link>
        <h3 className="text-2xl font-semibold">Payment Detail</h3>
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
                  <h4 className="text-2xl">{cart.product.name}</h4>
                  <p className="text-sm">
                    {convertToRupiah(Number(cart.product.price))}
                  </p>
                  <p className="text-sm">Quantity : {cart.quantity}</p>
                </div>
              </div>
            </ScrollArea>
            <Separator />
          </div>
        ))}
        <p className="font-semibold mt-2 text-sm">
          Total should pay : {convertToRupiah(totalPrice)}
        </p>
        <Button
          onClick={() => {
            dispatch(setTransactionToken(transactionToken));
            setIsPay(true);
          }}
          className="mt-3"
          disabled={isPay}
        >
          Pay Now
        </Button>
      </div>
      {isPay && (
        <div className="flex flex-col">
          <h3 className="text-2xl font-semibold">Select Payment Method</h3>
          <div id="snap-container" className="w-full mt-4 rounded-md"></div>
        </div>
      )}
    </div>
  );
}
