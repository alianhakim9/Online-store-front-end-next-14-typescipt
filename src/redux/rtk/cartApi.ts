// Need to use the React-specific entry point to import createApi
import { CartItem } from "@/types/cart";
import { BaseResponse } from "@/types/responses";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios, { AxiosError, AxiosResponse } from "axios";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
  }),
  endpoints: (builder) => ({
    getCartByUserId: builder.query<BaseResponse<CartItem[]>, string>({
      query: (userId) => `/carts?populate=deep&filters[user]=${userId}?`,
    }),
  }),
});

export const addCartItem = createAsyncThunk(
  "addCartItem",
  async (data: CartItem, thunkApi) => {
    const cartItem = {
      data: {
        product: data.product,
        user: data.userId,
        quantity: data.quantity,
        subTotal: data.subtotal,
      },
    };
    const response: AxiosResponse = await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/carts`, cartItem)
      .then((response: AxiosResponse) => {
        return response.data;
      })
      .catch((err: AxiosError) => console.log(err.response));
    return response;
  }
);

export const { useGetCartByUserIdQuery } = cartApi;
