import axios, { AxiosResponse } from "axios";
import { BaseResponse, Category, Product } from "@/app/lib/definitions";

export const carousels = [
  "/images/carousels/carousel-1.jpg",
  "/images/carousels/carousel-2.jpg",
  "/images/carousels/carousel-3.jpg",
];

export async function fetchProducts() {
  try {
    const response = await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/products?populate=deep`)
      .then((response: AxiosResponse) => {
        return response.data;
      });
    const products = response.data as Product[];
    return products;
  } catch (error) {
    throw new Error("Failed to fetch products.");
  }
}

export async function fetchCategories() {
  try {
    const response = await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/categories`)
      .then((response: AxiosResponse) => {
        return response.data;
      });
    const categories = response.data as Category[];
    return categories;
  } catch (error) {
    throw new Error("Failed to fetch categories.");
  }
}
