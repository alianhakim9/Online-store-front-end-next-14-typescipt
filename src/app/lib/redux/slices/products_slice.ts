import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { addFavProduct } from "@/app/lib/redux/rtk/productApi";
import { ProductState } from "@/types/state";
import { Product } from "@/app/lib/definitions";
import axios, { AxiosError } from "axios";
import { setCookies } from "@/app/lib/utils";

const COOKIE_KEY = "fav_products";

const initialState: ProductState = Cookies.get(COOKIE_KEY)
  ? {
      ...JSON.parse(Cookies.get(COOKIE_KEY) || "[]"),
      loading: true,
    }
  : {
      products: [],
      loading: false,
    };

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setFavProductFromDb: (state, action) => {
      state.products = action.payload;
      setCookies(COOKIE_KEY, state);
    },
    addToFavourite: (state, action) => {
      const product = action.payload as Product;
      const existingItem =
        state.products && state.products.find((item) => item.id === product.id);
      if (existingItem) {
        state.products = state.products.map((item) => {
          if (item.id === product.id) {
            return {
              ...product,
            };
          } else {
            return item;
          }
        });
      } else {
        state.products = [...state.products, product];
      }
      setCookies(COOKIE_KEY, state);
    },
    removeFavourite: (state, action) => {
      const product = action.payload.product as Product;
      // const userId = action.payload.userId as string;
      const favId = product.idFavourite;
      if (favId) {
        axios
          .delete(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${favId}`)
          .catch((err: AxiosError) => console.log(err.response));
        state.products = state.products.filter(
          (item: Product) => item.id !== product.id
        );
        setCookies(COOKIE_KEY, state);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addFavProduct.fulfilled, (state, action) => {
      const favId = action.payload.response.data.id;
      const productId = action.payload.productId;
      const cookiesData = JSON.parse(
        Cookies.get(COOKIE_KEY) || "[]"
      ) as ProductState;
      if (cookiesData) {
        state.products = cookiesData.products.map((item) => {
          if (item.id === productId) {
            return {
              ...item,
              idFavourite: favId,
              isFavourite: true,
            };
          } else {
            return {
              ...item,
              isFavourite: true,
            };
          }
        });
        setCookies(COOKIE_KEY, state);
      }
    });
  },
});

export const { setFavProductFromDb, addToFavourite, removeFavourite } =
  productSlice.actions;

export default productSlice.reducer;
