"use client";

import { RootState } from "@/app/lib/redux/store";
import { useSelector } from "react-redux";
import ProductCard from "@/app/ui/product/card";
import { Product } from "@/app/lib/definitions";

const FavouritePage = () => {
  const products = useSelector((state: RootState) => state.product.products);

  return (
    <div>
      <h3 className="text-2xl font-semibold mb-4">List produk favorit</h3>
      {products && (
        <div className="grid grid-cols-5 gap-2">
          {products.map((data: Product, index) => (
            <ProductCard product={data} key={index} showDelFavBtn />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavouritePage;
