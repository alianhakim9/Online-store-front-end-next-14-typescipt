"use client";

import { Input } from "@/components/ui/input";
import { useDebouncedCallback } from "use-debounce";
import { useSearchParams, useRouter } from "next/navigation";

export function SearchProduct() {
  const searchParams = useSearchParams();
  // const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
      params.set("page", "1");
      replace(`/products?${params.toString()}`);
    } else {
      params.delete("query");
      replace(`/home`);
    }
  }, 300);

  return (
    <Input
      placeholder="Cari produk..."
      onChange={(e) => {
        handleSearch(e.target.value);
      }}
      // defaultValue={searchParams.get("query")?.toString()}
    />
  );
}
