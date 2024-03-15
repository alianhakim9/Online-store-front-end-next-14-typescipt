// Need to use the React-specific entry point to import createApi
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { BaseResponse, Product } from "@/app/lib/definitions";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
  }),
  endpoints: (builder) => ({
    getFavProductByUserId: builder.query<BaseResponse<Product[]>, string>({
      query: (userId) => `/favourites?populate=deep&filters[user]=${userId}`,
    }),
  }),
});

export const addFavProduct = createAsyncThunk(
  "addFavouriteProduct",
  async (
    data: {
      productId: string;
      userId: string;
    },
    thunkApi
  ) => {
    const favProduct = {
      data: {
        user: data.userId,
        product: data.productId,
      },
    };
    const response: any = await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/favourites`, favProduct)
      .then((response: AxiosResponse) => {
        return {
          response: response.data,
          productId: data.productId,
        };
      })
      .catch((err: AxiosError) => console.log(err.response));
    return response;
  }
);

export const { useGetFavProductByUserIdQuery } = productApi;
