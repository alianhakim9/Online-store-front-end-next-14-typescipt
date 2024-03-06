"use client";

import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { CartContext } from "@/context/CartContext";
import { hideLoading, setCarts } from "@/redux/slices/cartSlice";
import { Cart } from "@/types/local";
import { API_BASE_URL } from "@/utils/constants";
import axios, { AxiosError, AxiosResponse } from "axios";
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
  const [cart, setCart] = useState<Cart[]>();

  useEffect(() => {
    dispatch(hideLoading());
    const userId = session?.user.sub;
    if (userId) {
      axios
        .get(`${API_BASE_URL}/api/carts?populate=deep&filters[user]=${userId}?`)
        .then((response: AxiosResponse) => {
          const items = response.data.data;
          dispatch(setCarts(items));
        })
        .catch((err: AxiosError) => {
          console.log(err);
        });
    }
    setCartToState();
  }, [dispatch, session?.user.sub]);

  const setCartToState = () => {
    if (localStorage.getItem("cart")) {
      setCart(
        localStorage.getItem("cart")
          ? JSON.parse(localStorage.getItem("cart")!)
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
