"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Props {
  meta: {
    page: number;
    pageSize: number;
    total: number;
    pageCount: number;
  };
}

export default function PaginationControl({ meta }: Props) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationItems count={meta.pageCount} page={meta.page} />
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

function PaginationItems({ count, page }: { count: number; page: number }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const handleOnChangePage = (currentPage: number) => {
    const params = new URLSearchParams(searchParams);
    if (page) {
      params.set("page", currentPage.toString());
    } else {
      params.delete("page");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const rows = [];
  for (let i = 1; i <= count; i++) {
    rows.push(
      <PaginationLink
        isActive={i === page}
        onClick={() => handleOnChangePage(i)}
        className="hover:cursor-pointer"
      >
        {i}
      </PaginationLink>
    );
  }
  return rows;
}
