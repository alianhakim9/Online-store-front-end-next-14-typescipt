import { CartItem, Category, Product } from "./local";

interface BaseResponse<T> {
  data: T;
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

interface Image {
  formats: {
    thumbnail: {
      url: string;
    };
  };
  url: string;
}

interface CartResponse {
  id: number;
  product;
}
