"use client";

import { createContext } from "react";
import { Carts } from "@/app/lib/definitions";

// const defaultValue: Cart[] = [];
const defaultValue: Carts[] = [];

export const CartContext = createContext(defaultValue);
