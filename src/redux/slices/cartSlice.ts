import { Cart, CartItem, Quantity, SubTotal } from "@/types/local";
import { createSlice } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";

type CartSliceState = {
  loading: boolean;
  cartItems: CartItem[];
  totalPrice: number;
  subTotal: SubTotal[];
  quantity: Quantity[];
};

const initialState: CartSliceState = Cookies.get("cart")
  ? {
      ...JSON.parse(Cookies.get("cart") || "[]"),
      loading: true,
    }
  : {
      loading: true,
      cartItems: [],
      totalPrice: 0,
      subTotal: [],
      quantity: [],
    };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const payload = action.payload;
      const item = payload.item;
      const userId = payload.userId;
      const existItem = state.cartItems.find((x) => x.id === item.id);
      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x.id === existItem.id ? item : x
        );
      } else {
        state.subTotal.push({
          id: item.id,
          count: item.subTotal,
        });
        state.quantity.push({
          id: item.id,
          count: item.quantity,
        });
        state.cartItems = [...state.cartItems, item];
      }
      let total = 0;
      state.cartItems.map((x, index) => {
        if (state.subTotal[index].id === x.id) {
          total += state.subTotal[index].count;
        }
        return total;
      });
      state.totalPrice = total;
      if (userId) {
        axios
          .post(`${process.env.NEXT_PUBLIC_API_URL}/carts`, {
            data: {
              product: item.id.toString(),
              user: userId,
              quantity: item.quantity,
              subTotal: item.subTotal,
            },
          })
          .then((response: AxiosResponse) => {
            console.log(response.data);
          });
      }
      Cookies.set("cart", JSON.stringify(state));
    },
    removeFromCart: (state, action) => {
      let total = 0;
      state.cartItems = state.cartItems.filter((x, index) => {
        if (x.id === action.payload) {
          total = state.totalPrice - state.subTotal[index].count;
        }
        return x.id !== action.payload;
      });
      state.subTotal = state.subTotal.filter((y) => {
        return y.id !== action.payload;
      });
      state.quantity = state.quantity.filter((qty) => {
        return qty.id !== action.payload;
      });
      state.totalPrice = total;
      Cookies.set("cart", JSON.stringify(state));
    },
    hideLoading: (state) => {
      state.loading = false;
    },
    addQuantity: (state, action) => {
      state.quantity = state.quantity.map((qty) => {
        if (qty.id === action.payload.id) {
          return {
            ...qty,
            count: qty.count + 1,
          };
        } else {
          return qty;
        }
      });
      state.cartItems.map((item, i) => {
        state.subTotal = state.subTotal.map((subTotal, index) => {
          if (subTotal.id === item.id) {
            return {
              ...subTotal,
              count: Number(item.price) * state.quantity[index].count,
            };
          } else {
            return subTotal;
          }
        });
        if (item.id === action.payload.id) {
          return {
            ...item,
            quantity: action.payload.quantity,
            subTotal: Number(item.price) * action.payload.quantity,
          };
        } else {
          return item;
        }
      });
      let total = 0;
      state.cartItems.map((x, index) => {
        if (state.subTotal[index].id === x.id) {
          total += state.subTotal[index].count;
        }
        return total;
      });
      state.totalPrice = total;
      Cookies.set("cart", JSON.stringify(state));
    },
    reduceQuantity: (state, action) => {
      let mItem = 0;
      state.quantity = state.quantity.map((qty) => {
        if (qty.id === action.payload.id) {
          return {
            ...qty,
            count: qty.count - 1,
          };
        } else {
          return qty;
        }
      });
      state.cartItems.map((item, _index) => {
        state.subTotal = state.subTotal.map((subTotal, index) => {
          if (subTotal.id === item.id) {
            return {
              ...subTotal,
              count: Number(item.price) * state.quantity[index].count,
            };
          } else {
            return subTotal;
          }
        });
        if (item.id === action.payload.id) {
          mItem = Number(item.price);
          return {
            ...item,
            quantity: action.payload.quantity,
            subTotal: Number(item.price) * action.payload.quantity,
          };
        } else {
          return item;
        }
      });
      state.totalPrice = state.totalPrice - mItem;
      Cookies.set("cart", JSON.stringify(state));
    },
    setCarts: (state, action) => {
      const items = action.payload;
      items.map((item: Cart) => {
        const cartItem: CartItem = {
          id: item.product.id,
          image: item.product.images[0].url,
          name: item.product.name,
          price: Number(item.product.price),
          quantity: item.quantity,
          stock: item.product.stock,
          subTotal: item.subTotal,
          weight: item.product.weight,
        };
        const existItem = state.cartItems.find((x) => x.id === cartItem.id);
        if (existItem) {
          state.cartItems = state.cartItems.map((x) =>
            x.id === existItem.id ? cartItem : x
          );
        } else {
          state.subTotal.push({
            id: item.id.toString(),
            count: item.subTotal,
          });
          state.quantity.push({
            id: item.id.toString(),
            count: item.quantity,
          });
          state.cartItems = [...state.cartItems, cartItem];
        }
      });
      let total = 0;
      state.subTotal.map((v) => {
        total += v.count;
      });
      state.totalPrice = total;
      Cookies.set("cart", JSON.stringify(state));
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  hideLoading,
  addQuantity,
  reduceQuantity,
  setCarts,
} = cartSlice.actions;

export default cartSlice.reducer;
