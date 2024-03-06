// "use client";

// import { CartContext } from "@/context/CartContext";
// import { Cart } from "@/types/local";
// import { API_BASE_URL } from "@/utils/constants";
// import axios, { AxiosError, AxiosResponse } from "axios";
// import { useSession } from "next-auth/react";
// import { useEffect, useState } from "react";

// interface ICartProvider {
//   children: React.ReactNode;
// }

// export const CartProvider = ({ children }: ICartProvider) => {
//   const [cart, setCart] = useState<Cart[]>();
//   const { data: session } = useSession();

//   useEffect(() => {
//     const userId = session?.user.sub;
//     if (userId) {
//       console.log("kesini");
//       axios
//         .get(
//           `${API_BASE_URL}/api/carts?populate=product&filters[user]=${userId}`
//         )
//         .then((response: AxiosResponse) => {
//           const items = response.data.data;
//           setCart(items);
//         })
//         .catch((err: AxiosError) => {
//           console.log(err.message);
//         });
//     } else {
//       console.log("apa da kesini");
//       setCartToState();
//     }
//   }, [session?.user.sub]);

//   const setCartToState = () => {
//     if (localStorage.getItem("cart")) {
//       setCart(
//         localStorage.getItem("cart")
//           ? JSON.parse(localStorage.getItem("cart")!)
//           : []
//       );
//     }
//   };

//   if (cart) {
//     return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
//   }

//   return <div>{children}</div>;
// };
