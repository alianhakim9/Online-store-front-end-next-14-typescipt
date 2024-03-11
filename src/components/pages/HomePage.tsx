"use client";

import { Category, Product } from "@/types/local";
import { BaseResponse } from "@/types/responses";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Banner from "../guest/Banner";
import EmptyState from "../guest/EmptyState";
import ProductCard from "../guest/ProductCard";
import ProductSkeletonCard from "../guest/skeletons/ProductSkeletonCard";
import { Separator } from "../ui/separator";

interface IHomepage {
  products: BaseResponse<Product[]>;
  categories: BaseResponse<Category[]>;
}

const HomePage = ({ products, categories }: IHomepage) => {
  const { data: session } = useSession();
  const [currentProducts, setCurrentProducts] = useState(products.data);

  if (!products || !categories) {
    let skeletons = [];
    for (let i = 0; i < 10; i++) {
      skeletons.push(<ProductSkeletonCard key={i} />);
    }
    return <div className="grid grid-cols-5 gap-4">{skeletons}</div>;
  }

  const getProductsByCategory = async (categoryId?: string) => {
    if (categoryId) {
      const filteredProducts = products.data.filter(
        (item) => item.category.id === categoryId
      );
      setCurrentProducts(filteredProducts);
    } else {
      setCurrentProducts(products.data);
    }
  };

  return (
    <div>
      <div>
        <Banner />
        <div className="my-4 flex gap-4">
          <div className="flex gap-8">
            <div className="flex flex-col gap-1 min-w-[250px]">
              <h4 className="text-1xl font-semibold">Kategori produk</h4>
              <div>
                {categories.data.length === 0 && (
                  <EmptyState title="Category still empty" mode="text" />
                )}
                <ul>
                  <li
                    className="list-disc list-inside text-sm underline hover:cursor-pointer"
                    onClick={() => getProductsByCategory()}
                  >
                    Semua kategori
                  </li>
                  {categories.data.map((item) => (
                    <li
                      key={item.id}
                      className="list-disc list-inside text-sm underline hover:cursor-pointer"
                      onClick={() => getProductsByCategory(item.id)}
                    >
                      {item.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <Separator orientation="vertical" />
          </div>
          {currentProducts.length === 0 && (
            <div className="w-full">
              <EmptyState title="Products still empty" mode="graphic" />
            </div>
          )}
          <div className="grid grid-cols-5 gap-2">
            {currentProducts.map((item) => (
              <ProductCard key={item.name} product={item} session={session} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
