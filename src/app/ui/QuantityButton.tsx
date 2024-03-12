"use client";

import {
  addQuantity,
  reduceQuantity,
} from "@/app/lib/redux/slices/carts_slice";
import { useDispatch } from "react-redux";
import { Button } from "../../components/ui/button";

interface IQuantityBtn {
  onDecrease?: () => void;
  onIncrease?: () => void;
  quantity: number;
  disableDecreaseBtn?: boolean;
  disableIncreaseBtn?: boolean;
  setInitialQuantity?: () => void;
  fromCart?: boolean;
  stock?: number;
  cartId?: string;
  userId?: string;
  productId?: string;
}

const QuantityButton = ({
  onDecrease,
  onIncrease,
  quantity,
  fromCart,
  stock,
  productId,
  userId,
  cartId,
}: IQuantityBtn) => {
  const dispatch = useDispatch();

  const handleAddQuantity = () => {
    if (fromCart) {
      dispatch(
        addQuantity({
          userId,
          productId,
          cartId,
        })
      );
    } else {
      onIncrease && onIncrease();
    }
  };

  const handleReduceQuantity = () => {
    if (fromCart && productId) {
      dispatch(
        reduceQuantity({
          userId,
          productId,
          cartId,
        })
      );
    } else {
      onDecrease && onDecrease();
    }
  };

  return (
    <div className="flex gap-3 items-center">
      <Button
        variant="outline"
        size="sm"
        onClick={handleReduceQuantity}
        disabled={quantity === 1}
      >
        -
      </Button>
      <Button variant="outline" size="sm" disabled>
        {quantity}
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={handleAddQuantity}
        disabled={quantity === stock}
      >
        +
      </Button>
    </div>
  );
};

export default QuantityButton;
