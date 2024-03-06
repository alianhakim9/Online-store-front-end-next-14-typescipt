"use client";

import { Cart } from "@/types/local";
import { createContext } from "react";

const defaultValue: Cart[] = [];

export const CartContext = createContext(defaultValue);
