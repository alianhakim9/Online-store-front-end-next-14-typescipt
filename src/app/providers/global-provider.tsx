"use client";

import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { useGetCartByUserIdQuery } from "@/app/lib/redux/rtk/cartApi";
import { useGetFavProductByUserIdQuery } from "@/app/lib/redux/rtk/productApi";
import { setCartFromDb } from "@/app/lib/redux/slices/carts_slice";
import { setFavProductFromDb } from "@/app/lib/redux/slices/products_slice";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { CartContext } from "../lib/context";
import { CartItem, Carts, Product } from "../lib/definitions";

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
  const { data: favouriteProducts } = useGetFavProductByUserIdQuery(
    userId as string
  );

  const setCartItem = useCallback(() => {
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
  }, [data, dispatch, userId]);

  const setFavProduct = useCallback(() => {
    if (userId && favouriteProducts) {
      const favProducts = favouriteProducts.data.map((item: any) => {
        const productResponse = item.product;
        let favProduct: Product = {
          id: productResponse.id,
          category: productResponse.category,
          description: productResponse.description,
          images: productResponse.images,
          name: productResponse.name,
          price: productResponse.price,
          stock: productResponse.stock,
          weight: productResponse.weight,
          idFavourite: item.id,
          isFavourite: true,
        };
        return favProduct;
      });
      dispatch(setFavProductFromDb(favProducts));
    }
  }, [dispatch, favouriteProducts, userId]);

  useEffect(() => {
    setCartItem();
    setFavProduct();
  }, [setCartItem, setFavProduct]);

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
