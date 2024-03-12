import { fetchCategories } from "@/app/lib/data";
import EmptyState from "../EmptyState";
import { Category } from "@/app/lib/definitions";

export async function SideCategory() {
  const categories = await fetchCategories();
  const getProductsByCategory = async (categoryId?: string) => {
    // if (categoryId) {
    //   const filteredProducts = products.data.filter(
    //     (item) => item.category.id === categoryId
    //   );
    //   setCurrentProducts(filteredProducts);
    // } else {
    //   setCurrentProducts(products.data);
    // }
  };

  return (
    <div className="flex flex-col gap-1 min-w-[200px]">
      <h4 className="text-1xl font-semibold">Kategori produk</h4>
      <div>
        {categories.length === 0 && (
          <EmptyState title="Category still empty" mode="text" />
        )}
        <ul>
          <li className="list-disc list-inside text-sm underline hover:cursor-pointer">
            Semua kategori
          </li>
          {categories.map((item: Category) => (
            <li
              key={item.id}
              className="list-disc list-inside text-sm underline hover:cursor-pointer"
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
