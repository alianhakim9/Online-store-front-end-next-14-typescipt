import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { cartApi } from "./rtk/cartApi";
import carts_slice from "./slices/carts_slice";
import paymentSlice from "./slices/paymentSlice";

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
