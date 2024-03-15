"use client";

import { Category } from "@/app/lib/definitions";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Props {
  categories: Category[];
}

export default function MobileCategory({ categories }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const getProductsByCategory = async (categoryId?: string) => {
    console.log(categoryId);
    const params = new URLSearchParams(searchParams);
    if (categoryId) {
      params.set("category", categoryId);
    } else {
      replace("/home");
      params.delete("category");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Select onValueChange={(e) => getProductsByCategory(e)}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Pilih kategori" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="uncategorized">Semua Kategori</SelectItem>
          {categories.map((category) => (
            <SelectItem value={category.id} key={category.id}>
              {category.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
