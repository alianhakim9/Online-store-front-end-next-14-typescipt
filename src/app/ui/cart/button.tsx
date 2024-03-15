"use client";

import { API_URL } from "@/app/lib/constants";
import { CartItem } from "@/app/lib/definitions";
import { setTransactionToken } from "@/app/lib/redux/slices/paymentSlice";
import {
  convertToRupiah,
  showSonnerToast,
  splitFullName,
} from "@/app/lib/utils";
import { Button } from "@/components/ui/button";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingButton from "../loading-button";
import { useSession } from "next-auth/react";
import { RootState } from "@/app/lib/redux/store";

interface ICartButton {
  cartItems: CartItem[];
  userId: string;
  session: Session | null;
  totalPrice: number;
}

export default function CartButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { cartItems, totalPrice } = useSelector(
    (state: RootState) => state.carts
  );
  const { data: session } = useSession();
  const userId = session?.user.userId.toString();

  const handleCheckout = async () => {
    setIsLoading(true);
    if (session) {
      let productIds: number[] = [];
      let quantities: number[] = [];

      cartItems.map((item) => {
        productIds.push(Number(item.product.id));
        quantities.push(Number(item.quantity));
      });

      const data = {
        first_name: splitFullName(session.user.name).firstName,
        last_name: splitFullName(session.user.name).lastName,
        email: session?.user.email,
        phone: "08943123989",
        total_price: totalPrice,
        user: userId,
        // order_detail: {
        //   products: productIds,
        //   quantities: quantities,
        //   order_detail_id: orderDetailId,
        // },
      };

      await axios
        .post(`${API_URL}/payment-gateway`, data)
        .then((response: AxiosResponse) => {
          dispatch(setTransactionToken(response.data));
          router.push("/payment");
        })
        .catch((err: AxiosError) => {
          showSonnerToast("Terjadi kesalahan pada saat checkout", err.message);
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-start md:items-end justify-end mt-5 flex-col gap-3">
      <p className="font-bold">Total : {convertToRupiah(totalPrice)}</p>
      <div className="flex gap-1">
        <Button variant="outline" onClick={() => router.push("/home")}>
          Lanjutkan belanja
        </Button>
        <LoadingButton
          isLoading={isLoading}
          onClick={handleCheckout}
          title="Checkout"
          type="button"
        />
      </div>
    </div>
  );
}
