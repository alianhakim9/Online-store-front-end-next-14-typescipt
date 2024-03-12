"use client";

import { Carts } from "@/types/cart";
import { createContext } from "react";

// const defaultValue: Cart[] = [];
const defaultValue: Carts[] = [];

export const CartContext = createContext(defaultValue);
