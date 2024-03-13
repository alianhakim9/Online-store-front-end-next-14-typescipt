"use client";

import { Product } from "@/app/lib/definitions";
import { convertToRupiah } from "@/app/lib/utils";
import QuantityButton from "@/app/ui/quantity-button";
import { Button } from "@/components/ui/button";
import { useState } from "react";

import { AddToCartButton } from "@/app/ui/product/add-to-cart";
import { ProductImageSlider } from "@/app/ui/product/product-image-slider";
import { SharedProductButton } from "@/app/ui/product/share-button";

interface IProductDetail {
  product: Product;
}

export function ProductDetail({ product }: IProductDetail) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex gap-10 mt-10 container">
      <div>
        <ProductImageSlider product={product} />
        <SharedProductButton />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <h3 className="font-bold text-3xl">{product.name}</h3>
        <hr />
        <p className="text-2xl text-green-700 font-semibold">
          {convertToRupiah(Number(product.price))}
        </p>
        <p>{product.description}</p>
        <p
          className={`${
            product.stock < 4 ? "text-red-500" : "text-black"
          } text-sm`}
        >
          Stok produk :<span className="ml-2">{product.stock}</span>
        </p>
        <div className="flex gap-4 items-center">
          <p className="text-sm">Kuantitas: </p>
          <QuantityButton
            quantity={quantity}
            onDecrease={() => setQuantity((prev) => prev - 1)}
            onIncrease={() => setQuantity((prev) => prev + 1)}
            productId={product.id.toString()}
            stock={product.stock}
          />
        </div>
        <div className="flex gap-2">
          <AddToCartButton product={product} quantity={quantity} outline />
          <Button variant="default" size="sm">
            Beli produk ini
          </Button>
        </div>
      </div>
    </div>
  );
}
