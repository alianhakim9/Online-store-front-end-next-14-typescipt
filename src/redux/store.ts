import { configureStore } from "@reduxjs/toolkit";
import paymentSlice from "./slices/paymentSlice";
import carts_slice from "./slices/carts_slice";
import { cartApi } from "./rtk/cartApi";
import { setupListeners } from "@reduxjs/toolkit/query";

const store = configureStore({
  reducer: {
    carts: carts_slice,
    payment: paymentSlice,
    [cartApi.reducerPath]: cartApi.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cartApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export default store;
