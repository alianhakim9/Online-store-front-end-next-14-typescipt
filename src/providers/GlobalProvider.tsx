"use client";

import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { CartContext } from "@/context/CartContext";
import { useGetCartByUserIdQuery } from "@/redux/rtk/cartApi";
import { getUserProfile } from "@/redux/rtk/userApi";
import { setCartFromDb } from "@/redux/slices/carts_slice";
import { CartItem, Carts } from "@/types/cart";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";

interface Props {
  session: Session | null;
  children: React.ReactNode;
}

const GlobalProvider = ({ session, children }: Props) => {
  const dispatch = useDispatch();
  // const userId = session?.user.sub;
  const userId = session?.user.userId.toString();
  const [cart, setCart] = useState<Carts[]>();
  const { data } = useGetCartByUserIdQuery(userId as string);

  useEffect(() => {
    if (userId && data) {
      const cartItems = data.data.map((item: any) => {
        let cartItem: CartItem = {
          id: item.id,
          product: item.product,
          quantity: item.quantity,
          subtotal: item.subTotal,
        };
        return cartItem;
      });
      dispatch(
        setCartFromDb({
          cartItems,
        })
      );
    }
  }, [data, dispatch, session, userId]);

  const setCartToState = () => {
    if (localStorage.getItem("carts")) {
      setCart(
        localStorage.getItem("carts")
          ? JSON.parse(localStorage.getItem("carts")!)
          : []
      );
    }
  };

  if (cart) {
    return (
      <CartContext.Provider value={cart}>
        <SessionProvider session={session}>
          {children}
          <Toaster />
          <SonnerToaster />
        </SessionProvider>
      </CartContext.Provider>
    );
  }

  return (
    <SessionProvider session={session}>
      {children}
      <Toaster />
      <SonnerToaster />
    </SessionProvider>
  );
};

export default GlobalProvider;
