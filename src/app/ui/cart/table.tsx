"use client";

import { API_BASE_URL } from "@/app/lib/constants";
import { RootState } from "@/app/lib/redux/store";
import { convertToRupiah } from "@/app/lib/utils";
import { RemoveDialog } from "@/app/ui/cart/remove-dialog";
import ImageLoad from "@/app/ui/image-load";
import QuantityButton from "@/app/ui/quantity-button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useSelector } from "react-redux";
import EmptyCart from "@/app/ui/cart/empy-cart";
import CartButton from "@/app/ui/cart/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function CartTable() {
  const { cartItems } = useSelector((state: RootState) => state.carts);
  const { data: session } = useSession();
  const userId = session?.user.userId.toString();

  return (
    <div>
      {cartItems.length === 0 ? (
        <EmptyCart />
      ) : (
        <div>
          <ScrollArea className="h-[40vh] w-full md:w-auto">
            <Table className="overflow-y-auto">
              <TableHeader>
                <TableRow>
                  <TableHead className="font-bold"></TableHead>
                  <TableHead className="font-bold">Produk</TableHead>
                  <TableHead className="font-bold">Harga</TableHead>
                  <TableHead className="font-bold max-w-[100px]">
                    Kuantitas
                  </TableHead>
                  <TableHead className="font-bold">SubTotal</TableHead>
                  <TableHead className="font-bold">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cartItems.map((item, i) => {
                  return (
                    <TableRow key={item.id}>
                      <TableCell className="max-w-[100px]">
                        <div className="h-[100px] w-[100px] relative">
                          <ImageLoad
                            src={`${API_BASE_URL}${item.product.images[0].url}`}
                            alt={item.product.name}
                            className="w-24 h-24"
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <div className="flex flex-col gap-1">
                            <Link href={`/products/${item.product.id}`}>
                              {item.product.name}
                            </Link>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {convertToRupiah(Number(item.product.price))}
                      </TableCell>
                      <TableCell>
                        <QuantityButton
                          quantity={item.quantity}
                          fromCart
                          stock={item.product.stock}
                          productId={item.product.id}
                          cartId={item.id || ""}
                          userId={userId}
                        />
                      </TableCell>
                      <TableCell>{convertToRupiah(item.subtotal)}</TableCell>
                      <TableCell>
                        <RemoveDialog
                          productId={item.product.id}
                          cartId={item.id || ""}
                          userId={userId || ""}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </ScrollArea>
          <CartButton />
        </div>
      )}
    </div>
  );
}
