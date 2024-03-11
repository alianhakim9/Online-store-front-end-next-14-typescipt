import { Image } from "./responses";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: string;
  stock: number;
  images: Image[];
  category: Category;
  weight: number;
  idFavourite?: string;
  isFavourite?: boolean;
};

export type User = {
  id: string;
  name: string;
  email: string;
  username: string;
  image: string;
  firstName: string;
  lastName: String;
};

export type CartItem = {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  stock: number;
  subTotal: number;
  weight: number;
  productId: string;
};

export type Cart = {
  id: number;
  product: Product;
  quantity: number;
  subTotal: number;
};

export type Category = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type SubTotal = {
  id: string;
  count: number;
};

export type Quantity = {
  id: string;
  count: number;
};
