"use client";

import { RootState } from "@/app/lib/redux/store";
import { useSelector } from "react-redux";
import ProductCard from "@/app/ui/product/card";
import { Product } from "@/app/lib/definitions";
import EmptyState from "@/app/ui/empty-state";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const FavouritePage = () => {
  const products = useSelector((state: RootState) => state.product.products);
  const { push } = useRouter();

  if (products.length === 0) {
    return (
      <EmptyState
        title="Produk favoritmu masih kosong, ayo eksplor produk dan tambahkan produk favoritmu sekarang!"
        mode="graphic"
      >
        <div className="items-center flex mt-4 justify-center">
          <Button
            size="sm"
            className="rounded-lg"
            onClick={() => push("/products")}
          >
            Eksplor Produk
          </Button>
        </div>
      </EmptyState>
    );
  }

  return (
    <div>
      <h3 className="text-2xl font-semibold mb-4">List produk favorit</h3>
      {products && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {products.map((data: Product, index) => (
            <ProductCard product={data} key={index} showDelFavBtn />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavouritePage;
