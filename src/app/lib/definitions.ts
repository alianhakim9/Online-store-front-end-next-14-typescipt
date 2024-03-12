export type BaseResponse<T> = {
  data: T;
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};

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

export type Category = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

interface Image {
  formats: {
    thumbnail: {
      url: string;
    };
  };
  url: string;
}

// export type CartItem = {
//   id: string;
//   name: string;
//   image: string;
//   price: number;
//   quantity: number;
//   stock: number;
//   subTotal: number;
//   weight: number;
//   productId: string;
// };

// export type Cart = {
//   id: number;
//   product: Product;
//   quantity: number;
//   subTotal: number;
// };

export type CartItem = {
  id?: string;
  product: Product;
  quantity: number;
  subtotal: number;
  userId?: string;
};

export type Carts = {
  cartItems: CartItem[];
  totalPrice: number;
  loading: boolean;
  itemIsExist?: boolean;
};

export type SubTotal = {
  id: string;
  count: number;
};

export type Quantity = {
  id: string;
  count: number;
};

declare const window: Window &
  typeof globalThis & {
    snap: {};
  };

import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      accessToken: string;
      userId: number;
      firstname: string;
      lastname: string;
    } & DefaultSession["user"];
  }

  interface User {
    firstname: string;
    lastname: string;
    username: string;
    jwt: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    firstName: string;
    lastName: string;
    username: string;
  }
}
