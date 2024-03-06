"use client";

import { Category, Product } from "@/types/local";
import { BaseResponse } from "@/types/responses";
import Banner from "../guest/Banner";
import ProductCard from "../guest/ProductCard";
import ProductSkeletonCard from "../guest/skeletons/ProductSkeletonCard";
import { Separator } from "../ui/separator";
import { useSession } from "next-auth/react";
import { ScrollArea } from "../ui/scroll-area";

interface IHomepage {
  products: BaseResponse<Product[]>;
  categories: BaseResponse<Category[]>;
}

const HomePage = ({ products, categories }: IHomepage) => {
  const { data: session } = useSession();

  if (!products) {
    let skeletons = [];
    for (let i = 0; i < 10; i++) {
      skeletons.push(<ProductSkeletonCard key={i} />);
    }
    return <div className="grid grid-cols-5 gap-4">{skeletons}</div>;
  }

  return (
    <div className="flex gap-5 px-10">
      <div className="flex gap-8" id="sidebar">
        <div className="flex flex-col gap-1 min-w-[250px]">
          <h4 className="text-1xl font-semibold">Categories</h4>
          <div>
            {categories.data.map((item) => (
              <p key={item.id} className="text-sm ml-2">
                {item.name}
              </p>
            ))}
          </div>
        </div>
        <Separator orientation="vertical" />
      </div>
      <ScrollArea className="h-[100vh]">
        <div className="flex-1 flex flex-col " id="content">
          <Banner />
          <div className="my-4 flex gap-4">
            <div>
              <div className="grid grid-cols-5 gap-2">
                {products.data.map((item) => (
                  <ProductCard
                    key={item.id}
                    product={{
                      ...item,
                      id: item.id.toString(),
                    }}
                    session={session}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default HomePage;
