import { Category, Product } from "@/app/lib/definitions";
import axios, { AxiosResponse } from "axios";
import { unstable_noStore as noStore } from "next/cache";

export const carousels = [
  "/images/carousels/carousel-1.jpg",
  "/images/carousels/carousel-2.jpg",
  "/images/carousels/carousel-3.jpg",
];

export async function fetchProducts(category?: string, query?: string) {
  let url = `${process.env.NEXT_PUBLIC_API_URL}/products?populate=deep`;
  if (category) {
    url = `${process.env.NEXT_PUBLIC_API_URL}/products?populate=deep&filters[category]=${category}`;
  }

  if (query) {
    url = `${process.env.NEXT_PUBLIC_API_URL}/products?filters[name][$contains]=${query}&populate=deep`;
  }

  noStore();
  try {
    const response = await axios.get(url).then((response: AxiosResponse) => {
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

export async function fetchProductById(id: string) {
  try {
    const response = await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}?populate=deep`)
      .then((response: AxiosResponse) => {
        return response.data;
      });
    const product = response.data as Product;
    return product;
  } catch (error) {
    throw new Error("Failed to fetch product.");
  }
}
