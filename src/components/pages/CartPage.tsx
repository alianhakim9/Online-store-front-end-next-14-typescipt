"use client";

import ImageLoad from "@/components/guest/ImageLoad";
import { Button } from "@/components/ui/button";
import { removeCartItem } from "@/redux/slices/carts_slice";
import { setTransactionToken } from "@/redux/slices/paymentSlice";
import { RootState } from "@/redux/store";
import { API_BASE_URL } from "@/utils/constants";
import { convertToRupiah, showToast } from "@/utils/helper";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import QuantityButton from "../guest/QuantityButton";
import LoadingButton from "../shared/LoadingButton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const CartPage = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { cartItems, totalPrice } = useSelector(
    (state: RootState) => state.carts
  );
  const { data: session } = useSession();
  const userId = session?.user.sub;

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleCheckout = async () => {
    setIsLoading(true);
    await axios
      .post("/api/payment-gateway", {
        cartItems,
        totalPrice,
        email: session?.user.email,
      })
      .then((response: AxiosResponse) => {
        dispatch(setTransactionToken(response.data));
        router.push("/payment");
      })
      .catch((err: AxiosError) => {
        showToast(err.message, "error");
      })
      .finally(() => setIsLoading(false));
  };

  const handleRemoveCartItem = (cartId?: string, productId?: string) => {
    const data = {
      userId,
      productId,
    };
    dispatch(
      removeCartItem({
        ...data,
        cartId,
      })
    );
    setOpen(false);
  };

  return (
    <div>
      <h3 className="text-3xl mb-5 font-semibold text-gray-600 text-center container">
        Shopping Cart
      </h3>
      {cartItems.length === 0 ? (
        <div className="w-full flex items-center justify-center flex-col">
          <ImageLoad
            alt="empty-cart"
            src="/images/empty-cart.png"
            className="h-80 w-80"
          />
        </div>
      ) : (
        <div>
          <ScrollArea className="h-[50vh]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-bold"></TableHead>
                  <TableHead className="font-bold">Product</TableHead>
                  <TableHead className="font-bold">Price</TableHead>
                  <TableHead className="font-bold max-w-[100px]">
                    Quantity
                  </TableHead>
                  <TableHead className="font-bold">SubTotal</TableHead>
                  <TableHead className="font-bold">Action</TableHead>
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
                          cartId={item.id}
                          userId={userId}
                        />
                      </TableCell>
                      <TableCell>{convertToRupiah(item.subtotal)}</TableCell>
                      <TableCell>
                        <Dialog open={open} onOpenChange={setOpen}>
                          <DialogTrigger>
                            <p className="text-red-500 font-semibold">Delete</p>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>
                                Are you absolutely sure?
                              </DialogTitle>
                              <DialogDescription>
                                This action cannot be undone.
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                              <Button
                                variant="destructive"
                                onClick={() => {
                                  handleRemoveCartItem(
                                    item.id,
                                    item.product.id
                                  );
                                }}
                              >
                                Remove
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </ScrollArea>
          <div className="flex items-end justify-end mt-5 flex-col gap-3">
            <p className="font-bold">Total : {convertToRupiah(totalPrice)}</p>
            <div className="flex gap-1">
              <Button variant="outline" onClick={() => router.push("/home")}>
                Continue shopping
              </Button>
              <LoadingButton
                isLoading={isLoading}
                onClick={handleCheckout}
                title="Checkout"
                type="button"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
