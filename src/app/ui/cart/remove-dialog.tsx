"use client";

import { useDispatch } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { removeCartItem } from "@/app/lib/redux/slices/carts_slice";
import { Button } from "@/components/ui/button";

interface IRemoveDialog {
  productId: string;
  cartId: string;
  userId: string;
}

export function RemoveDialog({ productId, cartId, userId }: IRemoveDialog) {
  const dispatch = useDispatch();

  const handleRemoveCartItem = () => {
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
  };

  return (
    <Dialog>
      <DialogTrigger>
        <p className="text-red-500 font-semibold">Delete</p>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Apakah anda yakin?</DialogTitle>
          <DialogDescription>aksi ini tidak dapat dibatalkan</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="destructive"
            onClick={() => {
              handleRemoveCartItem();
            }}
          >
            Remove
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
