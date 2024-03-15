"use client";

import { setTransactionToken } from "@/app/lib/redux/slices/paymentSlice";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";

interface Props {
  isPay: boolean;
  onIsPay: () => void;
  tsToken?: string;
}

export default function PaymentButton({ isPay, onIsPay, tsToken }: Props) {
  const dispatch = useDispatch();

  return (
    <Button
      onClick={() => {
        dispatch(setTransactionToken(tsToken));
        onIsPay();
      }}
      className="mt-3 rounded-xl"
      disabled={isPay}
    >
      Bayar sekarang
    </Button>
  );
}
