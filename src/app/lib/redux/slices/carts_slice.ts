import { createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import { addCartItem } from "@/app/lib/redux/rtk/cartApi";
import { CartItem, Carts } from "@/app/lib/definitions";
import { setCookies } from "@/app/lib/utils";

const COOKIE_KEY = "carts";

const initialState: Carts = Cookies.get(COOKIE_KEY)
  ? {
      ...JSON.parse(Cookies.get(COOKIE_KEY) || "[]"),
      loading: true,
    }
  : {
      cartItems: [],
      totalPrice: 0,
      loading: false,
      itemIsExist: false,
    };

const cartsSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    setCartFromDb: (state, action) => {
      let total = 0;
      const cartItems: CartItem[] = action.payload.cartItems;
      state.cartItems = cartItems.map((cartItem) => {
        total += cartItem.subtotal;
        return cartItem;
      });
      state.totalPrice = total;
      setCookies(COOKIE_KEY, state);
    },
    addToCart: (state, action) => {
      const cartItem = action.payload as CartItem;
      const existingItem = state.cartItems.find(
        (item) => item.product.id === cartItem.product.id
      );
      if (existingItem) {
        state.cartItems = state.cartItems.map((item) => {
          if (item.product.id === cartItem.product.id) {
            return cartItem;
          } else {
            return item;
          }
        });
      } else {
        state.cartItems = [...state.cartItems, cartItem];
      }
      state.itemIsExist = existingItem ? true : false;
      // console.log(state.itemIsExist);
      let total = 0;
      state.cartItems.map((item) => {
        total += item.subtotal;
      });
      state.totalPrice = total;
      setCookies(COOKIE_KEY, {
        cartItems: state.cartItems,
        totalPrice: state.totalPrice,
      });
    },
    removeCartItem: (state, action) => {
      const userId = action.payload.userId;
      const cartId = action.payload.cartId;
      const productId = action.payload.productId;
      if (userId && cartId) {
        axios
          .delete(`${process.env.NEXT_PUBLIC_API_URL}/carts/${cartId}`)
          .catch((err: AxiosError) => console.log(err.response));
      }
      let total = 0;
      state.cartItems = state.cartItems.filter((item) => {
        total = Number(item.product.price) * item.quantity;
        return item.product.id !== productId;
      });
      state.totalPrice = total;
      state.itemIsExist = false;
      setCookies(COOKIE_KEY, state);
    },
    addQuantity: (state, action) => {
      const userId = action.payload.userId;
      const productId = action.payload.productId;
      const cartId = action.payload.cartId;
      let total = 0;
      state.cartItems = state.cartItems.map((item) => {
        if (productId === item.product.id) {
          if (item.quantity < item.product.stock) {
            item.quantity = item.quantity + 1;
            item.subtotal = item.subtotal * item.quantity;
            if (userId) {
              if (cartId === item.id) {
                axios
                  .put(`${process.env.NEXT_PUBLIC_API_URL}/carts/${cartId}`, {
                    data: {
                      quantity: item.quantity,
                      subTotal: item.subtotal,
                    },
                  })
                  .catch((err: AxiosError) => {
                    console.log(err.response);
                  });
              }
            }
          }
        }
        total += item.subtotal;
        return item;
      });
      state.totalPrice = total;
      setCookies(COOKIE_KEY, state);
    },
    reduceQuantity: (state, action) => {
      const userId = action.payload.userId;
      const productId = action.payload.productId;
      const cartId = action.payload.cartId;
      let total = 0;
      state.cartItems = state.cartItems.map((item) => {
        if (productId === item.product.id) {
          item.quantity = item.quantity - 1;
          item.subtotal = Number(item.product.price) * item.quantity;
          if (userId) {
            if (cartId === item.id) {
              axios
                .put(`${process.env.NEXT_PUBLIC_API_URL}/carts/${cartId}`, {
                  data: {
                    quantity: item.quantity,
                    subTotal: item.subtotal,
                  },
                })
                .catch((err: AxiosError) => {
                  console.log(err.response);
                });
            }
          }
          total = state.totalPrice - item.subtotal;
        }
        return item;
      });
      state.totalPrice = total;
      setCookies(COOKIE_KEY, state);
    },
    hideLoading: (state, action) => {
      state.loading = false;
    },
    setItemExist: (state, action) => {
      state.itemIsExist = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addCartItem.fulfilled, (state, action) => {
      const cartId = action.payload.data.id;
      let total = 0;
      state.cartItems = state.cartItems.map((item) => {
        const newItem: CartItem = {
          id: cartId,
          product: item.product,
          quantity: item.quantity,
          subtotal: item.subtotal,
        };
        total += newItem.subtotal;
        return newItem;
      });
      state.totalPrice = total;
      setCookies(COOKIE_KEY, state);
    });
  },
});

export const {
  addToCart,
  removeCartItem,
  addQuantity,
  reduceQuantity,
  // setCartFromDb,
  setCartFromDb,
  hideLoading,
} = cartsSlice.actions;

export default cartsSlice.reducer;
