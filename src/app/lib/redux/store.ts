import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { cartApi } from "@/app/lib/redux/rtk/cartApi";
import carts_slice from "@/app/lib/redux/slices/carts_slice";
import paymentSlice from "@/app/lib/redux/slices/paymentSlice";
import products_slice from "@/app/lib/redux/slices/products_slice";
import { productApi } from "@/app/lib/redux/rtk/productApi";

const store = configureStore({
  reducer: {
    carts: carts_slice,
    payment: paymentSlice,
    [cartApi.reducerPath]: cartApi.reducer,
    product: products_slice,
    [productApi.reducerPath]: productApi.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([cartApi.middleware, productApi.middleware]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export default store;
