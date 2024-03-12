import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import { signOut } from "next-auth/react";
import toast from "react-hot-toast";
import { toast as sonnerToast } from "sonner";

import * as crypto from "crypto";
import Cookies from "js-cookie";

export function showToast(message: string, type: "success" | "error") {
  if (type === "success") {
    toast.success(message, { position: "bottom-right" });
  } else {
    toast.error(message, { position: "bottom-right" });
  }
}

export function showSonnerToast(message: string, description?: string) {
  sonnerToast(message, {
    description: description,
  });
}

export function onSignOut(callbackUrl?: string) {
  Cookies.remove("carts");
  return signOut({ callbackUrl, redirect: true });
}

export const addDecimals = (num: number) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export function generateOrderId(): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let orderId = "order_";
  for (let i = 0; i < 10; i++) {
    orderId += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return orderId;
}

export function generateOrderDetailId(): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let orderId = "order_detail_";
  for (let i = 0; i < 10; i++) {
    orderId += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return orderId;
}

export function generateSHA512(input: string): string {
  const hash = crypto.createHash("sha512");
  hash.update(input);
  return hash.digest("hex");
}

export function convertToRupiah(price: number): string {
  // Format harga ke format Rupiah tanpa desimal dan titik sebagai pemisah ribuan
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

export function splitFullName(fullName?: string | null | undefined): {
  firstName: string;
  lastName: string;
} {
  if (fullName) {
    const nameParts: string[] = fullName.split(" ");
    const firstName: string = nameParts[0];
    const lastName: string = nameParts.slice(1).join(" ");

    return {
      firstName: firstName,
      lastName: lastName,
    };
  } else {
    return {
      firstName: "",
      lastName: "",
    };
  }
}
