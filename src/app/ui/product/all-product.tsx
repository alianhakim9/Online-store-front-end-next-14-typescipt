import { fetchProducts } from "@/app/lib/data";
import ProductCard from "@/app/ui/product/card";

export async function AllProduct() {
  const products = await fetchProducts();
  return (
    <div className="grid grid-cols-5 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
