"use client";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { addToCart } from "@/redux/slices/cartSlice";
import { Product } from "@/types/local";
import { convertToRupiah, showSonnerToast } from "@/utils/helper";
import Link from "next/link";
import { BiCart } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { Button } from "../ui/button";
import ImageLoad from "./ImageLoad";
import { API_BASE_URL } from "@/utils/constants";
import { Session } from "next-auth";

interface IProductProps {
  product: Product;
  session?: Session | null;
}

const ProductCard = ({ product, session }: IProductProps) => {
  const dispatch = useDispatch();

  const thumbnail = product.images[0].formats.thumbnail.url;

  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <div>
          <ImageLoad
            className="h-40 w-40 mx-auto"
            src={
              thumbnail
                ? `${API_BASE_URL}${thumbnail}`
                : "/images/placeholder.jpg"
            }
            alt={product.name}
          />
          <p className="font-bold">{convertToRupiah(Number(product.price))}</p>
          <div className="bg-slate-100 px-2 py-1 rounded-lg w-1/2 my-2 relative bottom-0 left-0">
            <p className="text-sm">{product.category.name}</p>
          </div>
        </div>
        <CardTitle className="hover:text-lime-950 text-base line-clamp-2">
          <Link href={`/products/${product.id}`}>{product.name}</Link>
        </CardTitle>
      </CardHeader>
      <CardFooter className="self-center">
        <Button
          className="rounded-lg hover:shadow-md"
          onClick={() => {
            const item = {
              id: product.id,
              name: product.name,
              image: product.images[0].url,
              price: product.price,
              quantity: 1,
              stock: product.stock,
              subTotal: Number(product.price),
              weight: product.weight,
            };
            dispatch(
              addToCart({
                item,
                userId: session?.user.sub,
              })
            );
            showSonnerToast("Product added to cart", product.name);
          }}
        >
          <BiCart size={20} className="mr-2" /> Add To Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
