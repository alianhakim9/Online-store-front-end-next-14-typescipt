import { fetchProducts } from "@/app/lib/data";
import ProductCard from "@/app/ui/product/card";
import { Session } from "next-auth";
import PaginationControl from "@/app/ui/product/pagination-control";
import EmptyState from "../empty-state";

interface Props {
  category?: string;
  query?: string;
  session?: Session | null;
  page?: string;
}

export async function AllProduct({ category, query, session, page }: Props) {
  let data;

  if (category === "uncategorized") {
    data = await fetchProducts(query, page);
  } else {
    data = await fetchProducts(query, page, category);
  }

  return (
    <div>
      {data.products.length === 0 ? (
        <EmptyState mode="graphic" title="Product yang dicari tidak ada" />
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {data.products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                showFavBtn
                session={session}
              />
            ))}
          </div>
          <div className="mt-5">
            <PaginationControl meta={data.meta.pagination} />
          </div>
        </>
      )}
    </div>
  );
}
