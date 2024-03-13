import { fetchProducts } from "@/app/lib/data";
import ProductCard from "@/app/ui/product/card";

interface Props {
  category?: string;
  query?: string;
}

export async function AllProduct({ category, query }: Props) {
  const products = await fetchProducts(category, query);
  return (
    <div className="grid grid-cols-5 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
