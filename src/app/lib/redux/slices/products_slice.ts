import { Product } from "@/types/local";
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { addFavProduct } from "../rtk/productApi";
import { ProductState } from "@/types/state";

const initialState: ProductState = Cookies.get("favProducts")
  ? {
      ...JSON.parse(Cookies.get("favProducts") || "[]"),
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
      Cookies.set("favProducts", JSON.stringify(state));
    },
    addToFavourite: (state, action) => {
      const product = action.payload as Product;
      const existingItem =
        state.products && state.products.find((item) => item.id === product.id);
      if (existingItem) {
        state.products = state.products.map((item) => {
          if (item.id === product.id) {
            return product;
          } else {
            return item;
          }
        });
      } else {
        state.products = [...state.products, product];
      }
      Cookies.set("favProducts", JSON.stringify(state));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addFavProduct.fulfilled, (state, action) => {
      const favId = action.payload.data.id;
      state.products = state.products.map((item) => {
        const newProduct: Product = {
          id: favId,
          category: item.category,
          description: item.description,
          images: item.images,
          name: item.name,
          price: item.price,
          stock: item.stock,
          weight: item.weight,
        };
        return newProduct;
      });
      Cookies.set("favProducts", JSON.stringify(state));
    });
  },
});

export const { setFavProductFromDb, addToFavourite } = productSlice.actions;

export default productSlice.reducer;
