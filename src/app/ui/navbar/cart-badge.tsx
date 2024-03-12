"use client";

import { RootState } from "@/app/lib/redux/store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiCart } from "react-icons/bi";
import { useSelector } from "react-redux";

export function CartBadge() {
  const [length, setLength] = useState(0);
  const router = useRouter();
  const cartItems = useSelector((state: RootState) => state.carts.cartItems);

  useEffect(() => {
    if (cartItems.length !== 0) setLength(cartItems.reduce((a, c) => a + 1, 0));
  }, [cartItems]);

  return (
    <Button
      variant="ghost"
      size="default"
      className="rounded-full flex gap-2"
      onClick={() => router.push("/cart")}
    >
      <BiCart size={28} />
      <Badge variant="default">{length}</Badge>
    </Button>
  );
}
