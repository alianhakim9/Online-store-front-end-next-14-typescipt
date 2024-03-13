import { API_BASE_URL } from "@/app/lib/constants";
import { Product } from "@/app/lib/definitions";
import { convertToRupiah } from "@/app/lib/utils";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Session } from "next-auth";
import Link from "next/link";
import ImageLoad from "@/app/ui/image-load";
import { AddToCartButton } from "@/app/ui/product/add-to-cart";
import { AddToFavouriteButton } from "@/app/ui/product/add-to-fav";

interface IProductProps {
  product: Product;
  session?: Session | null;
  showFavBtn?: boolean;
  showDelFavBtn?: boolean;
}

const ProductCard = ({ product, showDelFavBtn }: IProductProps) => {
  const thumbnail = product.images[0].formats.thumbnail.url;

  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <div>
          <div className="relative">
            <ImageLoad
              className="h-40 w-40 mx-auto"
              src={
                thumbnail
                  ? `${API_BASE_URL}${thumbnail}`
                  : "/images/placeholder.jpg"
              }
              alt={product.name}
            />
          </div>
          <p className="font-semibold text-sm mt-2">
            {convertToRupiah(Number(product.price))}
          </p>
          <div className="bg-slate-100 px-2 py-1 rounded-lg my-2 relative bottom-0 left-0 w-full text-left">
            <p className="text-sm line-clamp-1">{product.category.name}</p>
          </div>
        </div>
        <CardTitle className="text-base text-lime-700 line-clamp-2 hover:text-lime-800">
          <Link href={`/products/${product.id}`}>{product.name}</Link>
        </CardTitle>
      </CardHeader>
      <CardFooter
        className={`${
          showDelFavBtn ? "flex flex-col gap-2 w-full" : "self-center w-full"
        }`}
      >
        <AddToCartButton product={product} />
        {showDelFavBtn && <AddToFavouriteButton product={product} />}
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
