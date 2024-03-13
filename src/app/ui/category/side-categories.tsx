"use client";

import { Category } from "@/app/lib/definitions";
import EmptyState from "@/app/ui/empty-state";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Props {
  categories: Category[];
}

export function SideCategory({ categories }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const getProductsByCategory = async (categoryId?: string) => {
    const params = new URLSearchParams(searchParams);
    if (categoryId) {
      params.set("category", categoryId);
    } else {
      params.delete("category");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col gap-1 min-w-[200px]">
      <h4 className="text-1xl font-semibold">Kategori produk</h4>
      <div>
        {categories.length === 0 && (
          <EmptyState title="Category still empty" mode="text" />
        )}
        <ul>
          <li
            className="list-disc list-inside text-sm underline hover:cursor-pointer"
            onClick={() => replace("/home")}
          >
            Semua kategori
          </li>
          {categories.map((item: Category) => (
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
  );
}
