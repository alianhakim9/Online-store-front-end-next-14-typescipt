import { Product } from "./local";

interface CartItem {
  id?: string;
  product: Product;
  quantity: number;
  subtotal: number;
  userId?: string;
}

interface Carts {
  cartItems: CartItem[];
  totalPrice: number;
  loading: boolean;
  itemIsExist?: boolean;
}
